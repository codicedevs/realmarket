import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';
import { Role } from 'src/authentication/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  // @MinLength(3)
  documento: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  pass: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accountId: string;
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  telefono: string;
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  @IsOptional()
  roles?: Role[];
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty()
  documento?: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  nombre?: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  accountId?: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  telefono?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  username?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  pass?: string;
  @ApiProperty()
  @IsOptional()
  roles?: Role[];
}

export class ChangeUserPassDto {
  @IsNotEmpty()
  @IsString()
  currentPass: string;
  @IsNotEmpty()
  @IsString()
  newPass: string;
}
