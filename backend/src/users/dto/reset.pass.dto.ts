import { IsString, MaxLength, MinLength } from "class-validator";

export class ResetPassDto {
  @MinLength(5)
  @MaxLength(6)
  resetKey: number;
  @IsString()
  username: string;
  @MinLength(8)
  password: string;
}