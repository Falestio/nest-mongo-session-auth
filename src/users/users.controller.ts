import { Post, Get, Body, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }
}
