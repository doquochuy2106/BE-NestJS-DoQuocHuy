import { Injectable } from '@nestjs/common';
import { CreateUserDto, DeleteUserDto } from './dto/create-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model, Mongoose } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHasPassWord = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    try {
      const hasPassWord = this.getHasPassWord(createUserDto.password);
      return await this.userModel.create({
        email: createUserDto.email,
        password: hasPassWord,
        name: createUserDto.name,
      });
    } catch (error) {
      console.log('check error: ', error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return 'not found User';
      }
      const userbyId = await this.userModel.findOne({
        _id: id,
      });
      return userbyId;
    } catch (error) {
      console.log('check error:', error);
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      if (!mongoose.Types.ObjectId.isValid(updateUserDto._id)) {
        return 'not found User';
      }
      return await this.userModel.updateOne(
        {
          _id: updateUserDto._id,
        },
        {
          email: updateUserDto.email,
          name: updateUserDto.name,
          address: updateUserDto.address,
        },
      );
    } catch (error) {
      console.log('check erorr: ', error);
    }
  }

  async remove(deleteUserDto: DeleteUserDto) {
    try {
      if (!mongoose.Types.ObjectId.isValid(deleteUserDto._id))
        return 'not found User';

      return await this.userModel.deleteOne({
        _id: deleteUserDto._id,
      });
    } catch (error) {
      console.log('check error: ', error);
    }
  }
}
