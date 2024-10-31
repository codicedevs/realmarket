import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtSettings } from 'src/settings';
import { IS_PUBLIC_KEY } from '../skip-auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Falta el token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSettings.JWT_ACCESS_SECRET,
      });
      //Se asigna el payload decodificado a la propiedad user de la request
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    console.log(request['user'])
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
