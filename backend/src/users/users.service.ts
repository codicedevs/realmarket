<<<<<<< HEAD
  import { Injectable, Inject, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import {
  BSON,
  DeleteResult,
  MongoClient,
  Repository,
  UpdateResult,
} from 'typeorm';
=======
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
>>>>>>> 305a0ee844eb48586f091ce17d167e2e49f359ae
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { error } from 'console';
import { ObjectId } from 'mongodb';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }
      return users;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
  async findUserById(id: ObjectId): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneBy({
        _id: new ObjectId(id),
      });

      if (!user) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND)
      }
      return user;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
  async findUserByUsername(username: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneBy({
        username: username,
      });

      if (!user) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND)
      }
      return user;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
  public async createUser(body: CreateUserDto): Promise<User> {
    try {
      const hashedPass = await hash(body?.pass, 10);
      body.pass = hashedPass;
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(
    id: ObjectId,
    body: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        new ObjectId(id),
        body,
      );
      if (user.affected === 0) {
        throw new HttpException('Theres no modifications', HttpStatus.NOT_MODIFIED)
      }
      return this.findUserById(new ObjectId(id));
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
  async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {      
        throw new HttpException('No users found', HttpStatus.NOT_FOUND)
      }
      return user;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}

//   async updateUser(updateUserDto: UpdateUserDto, id: string):Promise<User[]> {
//     // const userQuery = await this.findById(id);
//     //     const userAct = Object.assign(userQuery, updateUserDto)
//     //     this.users = this.users.map(u=>u.id === id ? userAct : u)
//         return

//   }


// }
