import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAdminGuard } from 'src/admin/jwt-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';  // Импортируем JwtService
import { BlacklistService } from '../blacklist/blacklist.service';  // Импортируем BlacklistService

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,  // Инжектируем JwtService
    private readonly blacklistService: BlacklistService,  // Инжектируем BlacklistService
  ) {}

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

  @Post('admin/logout')
  @UseGuards(JwtAdminGuard)  // Используем Guard для админов
  async logoutAdmin(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = this.jwtService.decode(token) as any;
    const expiresAt = new Date(decoded.exp * 1000);  // Преобразуем время истечения токена в дату

    await this.blacklistService.addTokenToBlacklist(token, expiresAt);
    return { message: 'Admin successfully logged out' };
  }

  @Post('user/logout')
  @UseGuards(JwtAuthGuard)  // Используем Guard для пользователей
  async logoutUser(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = this.jwtService.decode(token) as any;
    const expiresAt = new Date(decoded.exp * 1000);

    await this.blacklistService.addTokenToBlacklist(token, expiresAt);
    return { message: 'User successfully logged out' };
  }
}