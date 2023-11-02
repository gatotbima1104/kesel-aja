import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Role } from "src/auth/role/role.enum"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEnum(Role)
    role: Role
}
