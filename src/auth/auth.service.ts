import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
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
}
