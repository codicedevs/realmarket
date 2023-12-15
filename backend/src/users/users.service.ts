import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
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
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay usuarios',
        });
      }
      return users;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }
  async findUserById(id: ObjectId): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneBy({
        _id: new ObjectId(id),
      });

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay usuarios',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async findUserByUsername(username: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneBy({
        username: username,
      });

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay usuarios',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
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
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'No hay nada que modificar',
        });
      }
      return this.findUserById(new ObjectId(id));
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
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
