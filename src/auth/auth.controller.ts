import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAdminGuard } from '../admin/jwt-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt'; 
import { BlacklistService } from '../blacklist/blacklist.service'; 
import { UserBlacklistService } from '../userblacklist/userblacklist.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
    private readonly userBlackListService: UserBlacklistService
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

  // Роут для логина
  @Post('login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    return this.authService.validateUser(login, password);
  }

  @Post('admin/logout')
  @UseGuards(JwtAdminGuard) 
  async logoutAdmin(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = this.jwtService.decode(token) as any;
    const expiresAt = new Date(decoded.exp * 1000);

    await this.blacklistService.addTokenToBlacklist(token, expiresAt);
    return { message: 'Admin successfully logged out' };
  }

  @Post('user/logout')
  @UseGuards(JwtAuthGuard)
  async logoutUser(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = this.jwtService.decode(token) as any;
    const expiresAt = new Date(decoded.exp * 1000);

    await this.userBlackListService.blacklistToken(token, expiresAt);
    return { message: 'User successfully logged out' };
  }
}