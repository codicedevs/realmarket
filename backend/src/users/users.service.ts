import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

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

  async changePass(
    username: string,
    currentPass: string,
    newPass: string,
  ): Promise<UpdateResult> {
    const user = await this.findByUsername(username);
    const isActualPass = await compare(currentPass, user.pass);
    if (!isActualPass)
      throw new NotFoundException('La contraseña provista no es correcta');
    const hashedPass = await hash(newPass, 10);

    return this.userRepository.update(new ObjectId(user._id), {
      pass: hashedPass,
    });
  }

  /// NUEVOS SERVICIOS DE PASSWORDS RECOVERY ///

  //   async passwordRecovery(email: string) {
  //     const user = await this.userRepository.findOneBy({ email });
  //     if (!user) throw new NotFoundException('Revise si su correo es el correcto');
  //     const resetKey = Math.floor(Math.random() * (99999 - 10000) + 10000);
  //     const resetKeyTimeStamp = new Date().toISOString();
  //     await this.userRepository.update(new ObjectId(user._id), {
  //       resetKey: resetKey,
  //       resetKeyTimeStamp: resetKeyTimeStamp,
  //     });
  //     await this.userRepository.sendPasswordRecovery(user, resetKey);
  //     const userUpdated = await this.userRepository.findOne(email);
  //     return { userUpdated, resetKey };
  //   }

  //   /**
  // * Esta funcion recibe lo referente en resetPassBody para actualizar la contraseña de un usuario que envia el resetKey que recibio
  // * Compara que el resetKey sea igual al generado en su modelo (cuando solicito el cambio de contraseña), y tambien determina que no este expirado (12hs)
  // * Si el proceso es correcto se actualiza la password del usuario y se establece resetKey en undefined, por haber sido utilizado
  // * @param resetPassBody
  // * @returns
  // */

  //   async resetPassword(resetPassBody: {
  //     resetKey: number;
  //     email: string;
  //     password: string;
  //   }) {
  //     const user = await this.userRepository.findOne(
  //       resetPassBody.email
  //     );
  //     if (user.resetKey != resetPassBody.resetKey) {
  //       throw new UnauthorizedException({ message: "El reset key es invalido" });
  //     }
  //     // Reset password key, tiene 12 hs de validez
  //     const keyFromUser = new Date(user.resetKeyTimeStamp);
  //     const actualDate = new Date();
  //     const differenceInHours = Math.abs(actualDate.getTime() - keyFromUser.getTime()) / (1000 * 60 * 60);
  //     if (differenceInHours > 12) {
  //       throw new UnauthorizedException(
  //         { message: "El reset key ha expirado, tiene una validez de 12 horas." }
  //       );
  //     }
  //     // Actualiza la contraseña del usuario cuando el proceso de resetKey es exitoso
  //     await this.userRepository.update(user.id, {
  //       password: resetPassBody.password,
  //     });
  //     // Resetea el resetKey en el modelo de usuario cuando es usado exitosamente
  //     await this.userRepository.update(user.id, {
  //       resetKey: null,
  //     });
  //     return;
  //   }


  ////////////////////////////////////////////////////////////////

  async deleteById(id: string): Promise<DeleteResult | undefined> {
    const result = await this.userRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Usuario no encontrado');
    return result;
  }
}
