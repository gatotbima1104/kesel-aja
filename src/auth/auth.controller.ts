import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUser } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() dto: RegisterUser) {
    return this.authService.register(dto)
  }

  @Post('login')
  loginUser(@Body() dto: LoginDto){
    return this.authService.login(dto)
  }

}
