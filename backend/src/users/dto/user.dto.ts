import {IsString, IsNotEmpty, MinLength, IsOptional} from 'class-validator'
import { ObjectId, ObjectIdColumn } from 'typeorm'

export class CreateUserDto {
    @IsString() 
    @IsNotEmpty()
    // @MinLength(3)
    documento: string
    @IsNotEmpty()
    @IsString() 
    nombre: string
    @IsString()
    @IsNotEmpty()
    username: string
    @IsString()
    @IsNotEmpty()
    pass: string
}

export class UpdateUserDto {
    
    @IsString() 
    @IsOptional()
    @MinLength(3)
    documento?: string
    @IsOptional()
    @IsString() 
    nombre?: string
}