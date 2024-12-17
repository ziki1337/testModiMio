import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Роут для регистрации
  @Post('register')
  async register(
    @Body('login') login: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(login, email, password);
  }

  // Роут для логина (опционально)
  @Post('login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    return this.authService.validateUser(login, password);
  }
}