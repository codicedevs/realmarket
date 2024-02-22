import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('all')
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

  @Post('register')
  public async registerUser(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.usersService.deleteById(id);
  }
}
