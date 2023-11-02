import { IsEnum, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../role/role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @MinLength(6)
    @MaxLength(20)
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    @MinLength(6)
    @MaxLength(20)
    password: string

    @Column({
        type: 'enum',
        default: Role.User,
        enum: Role
    })
    role: Role
}