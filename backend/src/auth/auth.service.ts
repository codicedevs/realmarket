import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { jwtConstants } from './constants';
import { RefreshAuthGuard } from './guards/refresh.guards';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    const checkpass = await compare(password, user.pass);
    if (!checkpass) {
      console.log(user?.pass, password, 'contrasena');
      throw new HttpException('Passwords do not match', 403);
    }
    const payload = {
      sub: user._id,
      username: user.username,
      cuenta: user.accountId,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refreshKey,
      expiresIn: '7d',
    });

    const data = {
      user: user,
      token: accessToken,
      refreshToken: refreshToken,
    };

    return data;
  }

  async refreshToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.refreshKey,
    });
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
