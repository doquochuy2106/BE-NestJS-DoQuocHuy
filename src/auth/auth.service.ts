import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.checkEmail(username);
    if (user) {
      const checkPasswordUser = this.usersService.checkPassword(
        pass,
        user.password,
      );
      if (checkPasswordUser === true) {
        return user;
      }
    }

    return null;
  }

  async login(user: IUser) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id: _id,
      name: name,
      email: email,
      role: role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      _id: _id,
      name: name,
      email: email,
      role: role,
    };
  }
}
