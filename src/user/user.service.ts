import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt'
import { find, retry } from 'rxjs';
import { UpdateUserDto } from './dto/update.user.dto';
import { waitForDebugger } from 'inspector';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ){}

  async create(dto: CreateUserDto) {
    const email = await this.userRepo.findOne({
      where: {
        email: dto.email
      }
    }) 

    if(!email){
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(dto.password, salt)

      console.log('sampe sini')

      const user = this.userRepo.create({
        ...dto,
        password: hashedPassword
      })

      await this.userRepo.save(user)
      delete user.password

      return {
        message: "User created successfully !!",
        user
      }
    } throw new HttpException({
      statusCode: HttpStatus.FORBIDDEN,
      message: "Email already exist !!"
    }, HttpStatus.FORBIDDEN)
  }

  async findAll() {
    return await this.userRepo.find({
      take: 10
    })
  }

  async findOne(id: string) {
    return await this.findUserById(id)
  }

  async findUserById(id: string){
    const user = await this.userRepo.findOne({
      where: {
        id
      }
    })
    if(!user){
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "user not found !!"
      }, HttpStatus.NOT_FOUND)
    }
    return user
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = this.findUserById(id)
    await this.userRepo.update(id, {
      ...user,
      ...dto
    })

    const updatedUser = await this.userRepo.findOneBy({id})

    delete updatedUser.password
    return {
      updatedUser,
      message: "User has been updated successfully !!"
    }
  }

  async remove(id: string) {
    await this.userRepo.delete({id})
    return {
      message: "User has been deleted successfully !!"
    }
  }
}
