import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUser } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ){}

  async register(dto: RegisterUser){
    const email = await this.userRepo.findOne({
      where: {
        email: dto.email
      }
    })

    if(!email){
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(dto.password, salt)

      const user = this.userRepo.create({
        ...dto,
        password: hashedPassword,
      })

      const payload: JwtPayload = {
        id: user.id,
        role: user.role
      }

      const token = this.jwtService.sign(payload)
      await this.userRepo.save(user)

      delete user.password
      return {
          user,
          token,
          message: 'User registered successfully !!'
      }
    }

    throw new HttpException({
      statusCode: HttpStatus.CONFLICT,
      message: "Email is already exist !"
    }, HttpStatus.CONFLICT)
  }

  async login(dto: LoginDto){
    const user = await this.userRepo.findOne({
      where: {
        email: dto.email
      }
    })

    if(!user){
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        message: "Email is incorrect !"
      }, HttpStatus.FORBIDDEN)
    }

    const isMatch = await this.validatePassword(dto.password, user.password)

    console.log('password error')
    if(!isMatch){
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        message: "Password is incorrect !"
      }, HttpStatus.FORBIDDEN)
    }

    const payload: JwtPayload = {
      id: user.id,
      role: user.role
    }

    delete user.password

    const token = this.jwtService.sign(payload)
    return{
      token,
      user,
      message: 'You are logged in successfully !'
    }
    
  }

  async validatePassword(password: string, hashedPassword: string){
    return await bcrypt.compare(password, hashedPassword)
  }
}
