import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Role } from "src/auth/role/role.enum"

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsEnum(Role)
    role: Role
}
