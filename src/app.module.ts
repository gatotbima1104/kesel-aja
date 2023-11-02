import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BlogModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
