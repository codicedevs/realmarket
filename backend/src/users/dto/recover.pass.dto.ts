import { IsString } from "class-validator";

export class RecoverPasswordDto {
  @IsString()
  email: string
}