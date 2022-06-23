import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}

  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.userModel({
      email: user.email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email })
  }

  async findAll() {
    return await this.userModel.find().exec();
  }
}
