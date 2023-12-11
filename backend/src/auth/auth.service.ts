import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt'
import {compare} from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}


    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByUsername(username);
        const checkpass = await compare(password, user.pass)
        if(!checkpass){   
            console.log(user?.pass, password, 'contrasena');
            throw new HttpException('Passwords do not match', 403)
        }
        const payload = {sub: user._id, username: user.username};
        const accessToken= await this.jwtService.signAsync(payload)
        
        const data={
            user: user,
            token: accessToken
        }

        return data
        
    }
}
