import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { ObjectId, UpdateResult } from 'typeorm';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/SkipAuth';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('all')
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  @ApiParam({name: 'id' })
  
  public async findUserById(@Param('id') id: ObjectId): Promise<User> {
    return this.usersService.findUserById(id);
  }
  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: ObjectId,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, body);
  }
  
  @Post('register')
  public async registerUser(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
