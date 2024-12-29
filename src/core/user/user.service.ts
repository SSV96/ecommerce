import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async create(dto: UserCreateDto) {
    return this.model.create(dto);
  }

  async signUp(userCreateDto: UserCreateDto) {
    const { email } = userCreateDto;
    const user = await this.model.findOne({ email });

    if (user) {
      return user;
    }

    return this.create(userCreateDto);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }
}
