import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {
    @IsNotEmpty()
    @IsString()
    title: string
    
    @IsString()
    @IsOptional()
    subHeader: string

    @IsNotEmpty()
    @IsString()
    body: string

    @IsNotEmpty()
    @IsArray()
    category: string[]
}
