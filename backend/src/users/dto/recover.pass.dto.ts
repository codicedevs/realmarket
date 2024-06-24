import { IsString } from "class-validator";

export class RecoverPasswordDto {
  @IsString()
  username: string
}