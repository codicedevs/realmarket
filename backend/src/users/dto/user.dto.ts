import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  // @MinLength(3)
  documento: string;
  @IsNotEmpty()
  @IsString()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  pass: string;
  @IsString()
  @IsNotEmpty()
  accountId: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  telefono: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  documento?: string;
  @IsOptional()
  @IsString()
  nombre?: string;
  @IsOptional()
  @IsString()
  accountId: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  telefono: string;
}
