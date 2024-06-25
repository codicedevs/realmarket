import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/auth/skip-auth';
import { getJwtPayload } from 'src/auth/utils/jwt.utils';
import { ObjectId } from 'typeorm';
import { RecoverPasswordDto } from './dto/recover.pass.dto';
import { ResetPassDto } from './dto/reset.pass.dto';
import {
  ChangeUserPassDto,
  CreateUserDto,
  UpdateUserDto,
} from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get('')
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  @ApiParam({ name: 'id' })
  public async findUserById(@Param('id') id: ObjectId): Promise<User> {
    return this.usersService.findById(id);
  }
  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: ObjectId,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateById(id, body);
  }

  @Post('changePass')
  public async changePass(
    @Req() request: Request,
    @Body() { currentPass, newPass }: ChangeUserPassDto,
  ) {
    const { username } = getJwtPayload(request);
    return this.usersService.changePass(username, currentPass, newPass);
  }

  @Post('register')
  @Public()
  public async registerUser(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.usersService.deleteById(id);
  }

  @Post("recover-password")
  @Public()
  async recoverPassword(@Body() recoverPassword: RecoverPasswordDto) {
    const result = await this.usersService.passwordRecovery(recoverPassword.email);
    return {
      message: "Proceso de recupero de contraseña iniciado exitosamente",
      data: result,
    };
  }
  /**
* @param resetPass
* @returns
*/

  @Post("reset-password")
  @Public()
  async resetPassword(@Body() resetPass: ResetPassDto) {
    const result = await this.usersService.resetPassword(resetPass);
    return {
      message: "Usted ha recuperado su contraseña exitosamente",
      data: result
    };
  }
}
