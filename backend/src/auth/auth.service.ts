import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { JWTPayload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(username: string, password: string) {
    //Hacer un DTO de signIn

    if (!username || !password)
      throw new HttpException(
        'Faltan credenciales: usuario o password',
        HttpStatus.BAD_REQUEST,
      );

    // console.log(username, password, 'para ver que onda');

    const user = await this.usersService.findUserByUsername(username);

    // Controla que el usuario exista

    // if (!user) {
    //   throw new HttpException('El usuario no existe', 401);
    // }

    //Controla la contrasena
    //La contrasena guardada tiene que estar hasheada

    const checkpass = await bcrypt.compare(password, user.pass);
    if (!checkpass) {
      throw new HttpException('Passwords do not match', 401);
    }

    const payload: JWTPayload = {
      sub: user._id,
      username: user.username,
      accountId: user.accountId,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refreshKey,
      //TODO: Mover a settings
      expiresIn: '7d',
    });

    const data = {
      user: user,
      token: accessToken,
      refreshToken: refreshToken,
    };

    return data;
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<JWTPayload>(
      refreshToken,
      {
        secret: jwtConstants.refreshKey,
      },
    );
    delete payload.iat;
    delete payload.exp;
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

//  ESTA ERA LA FORMA DE HACERLO ORIGINALMENTE PERO NO ME MOSTRABA LOS DATOS DEL PAYLOAD EN EL JWT. NO SE PORQUE
// async refreshToken(user: any) {
//   const payload = {
//     sub: user.sub,
//     username: user.username,
//     cuenta: user.accountId,
//   };

//   return {
//     accessToken: await this.jwtService.signAsync(payload)
// }
