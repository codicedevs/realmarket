import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }
  async findById(id: ObjectId): Promise<User> {
    const user: User = await this.userRepository.findOneByOrFail({
      _id: new ObjectId(id),
    });

    return user;
  }
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({
      username: username,
    });
    return user;
  }

  async create(body: CreateUserDto): Promise<User> {
    const hashedPass = await hash(body?.pass, 10);
    body.pass = hashedPass;
    return this.userRepository.save(body);
  }

  async updateById(
    id: ObjectId,
    body: UpdateUserDto,
  ): Promise<User | undefined> {
    const result: UpdateResult = await this.userRepository.update(
      new ObjectId(id),
      body,
    );
    if (!result.affected) throw new NotFoundException('Usuario no encontrado');
    return this.findById(new ObjectId(id));
  }

  async deleteById(id: string): Promise<DeleteResult | undefined> {
    const result = await this.userRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Usuario no encontrado');
    return result;
  }
}
