import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {

constructor(
  @InjectRepository(Blog) private blogRepo: Repository<Blog>,
){}

  async create(dto: CreateBlogDto) {
    const blog = this.blogRepo.create({
      ...dto,
      createdAt: new Date
    })

    await this.blogRepo.save(blog)
    return {
      message: "Blog created successfully !!",
      blog
    }
  }

  findAll() {
    return this.blogRepo.find({
      take: 5,
    })
  }

  findOne(id: string) {
    return this.findById(id)
  }

  async update(id: string, dto: UpdateBlogDto) {
    const blog = await this.findById(id)

    await this.blogRepo.update(id, {
      ...blog,
      ...dto
    })
    const updatedBlog = await this.findById(id)

    return {
      message: "Blog has been updated successfully !",
      updatedBlog
    }
  }

  async remove(id: string) {
    const blog = await this.blogRepo.delete(id)
    if(blog.affected == 0){
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Blog not found'
      }, HttpStatus.NOT_FOUND)
    }
    return {
      message: 'Blog deleted successfully !!',
      statusCode: HttpStatus.OK
    }
  }

  async findById(id: string): Promise<object>{
    const blog = await this.blogRepo.findOneBy({ id })
    if(!blog){
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Blog not found'
      }, HttpStatus.NOT_FOUND)
    }
    return blog
  }
}
