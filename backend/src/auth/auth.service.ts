import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtSettings } from 'src/settings';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JWTPayload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  //Declaracion de la instancia del Logger dentro de cada servicio

  private readonly logger = new Logger(AuthService.name);

  async signIn(username: string, password: string) {
    if (!username || !password)
      throw new BadRequestException('Faltan credenciales: usuario o password');
    let user: User | null = null;
    try {
      //Implementacion del logger para ver cuanto tarda el servicio en contestar
      const startTime = Date.now();
      user = await this.usersService.findByUsername(username);
      this.logger.log(
        'Duracion de la peticion',
        (Date.now() - startTime) / 1000,
      );
    } catch (error) {
      throw new HttpException('Credenciales inválidas', 401);
    }

    //Controla la contrasena
    //La contrasena guardada tiene que estar hasheada
    const checkpass = await bcrypt.compare(password, user.pass);
    if (!checkpass) throw new HttpException('Credenciales inválidas', 401);

    const payload: JWTPayload = {
      sub: user._id,
      username: user.username,
      accountId: user.accountId,
      roles: user.roles ? user.roles : undefined
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtSettings.JWT_REFRESH_SECRET,
      expiresIn: jwtSettings.JWT_REFRFES_EXPIRES_IN,
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
        secret: jwtSettings.JWT_REFRESH_SECRET,
      },
    );
    delete payload.iat;
    delete payload.exp;
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
  async getConfigToken(refreshToken) {
    const payload = await this.jwtService.verifyAsync<JWTPayload>(refreshToken);
    return payload.username;
  }
}
