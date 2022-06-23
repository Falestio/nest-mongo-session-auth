import { Controller, Get, Body, Post, UseGuards, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { User } from './users/users.schema'
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async hello(@Session() session: Record<string, any>) {
    if (session){
      console.log(session)
      return "session is set"
    }
    return "session is not set"
  }

  @Post('auth/signup')
  async create(@Body() user: User) {
      const checkUser = await this.usersService.findOne(user.email);
      if (checkUser) {
          return {
              message: 'User already exists',
          };
      }
      return this.usersService.create(user);
  }

  @Post('auth/login')
  async login(@Body() user: User, @Session() session: Record<string, any>) {
    const validatedUser = await this.authService.validateUser(user.email, user.password);
    // @ts-ignore
    if (validatedUser.status == "invalid") {
      return { 
        message: 'Invalid credentials',
        code: 401
      }
    }

    // @ts-ignore
    if (validatedUser.status == "notExist") {
      return {
        message: 'User not exist',
        code: 404
      }
    }

    // @ts-ignore
    session.userId = validatedUser._doc._id;
    session.validated = true
    console.log(validatedUser)
    return validatedUser
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
