import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersServices: UsersService){}

    async validateUser(email: string, password: string) {
        const user = await this.usersServices.findOne(email);
        console.log("this is the user", user)
        if (!user){
            return {
                message: 'User not exist',
                status: 'notExist'
            }
        }

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return {
            message: 'Invalid credentials',
            status: 'invalid'
        };
    }
}
