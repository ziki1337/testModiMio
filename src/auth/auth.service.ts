import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Регистрация пользователя
  async register(login: string, email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser(login, email, hashedPassword);

    return this.generateToken(user);
  }

  async generateToken(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: 'user',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findByLogin(login);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return this.generateToken(user);
  }
}