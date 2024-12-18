import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUserGuard } from '../userblacklist/jwt-user.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: { login: string, email: string, password: string }): Promise<User> {
    return this.userService.createUser(userData.login, userData.email, userData.password);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}

// Новый контроллер для работы с profile

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtUserGuard)  // Применяем Guard
  @Get()
  getProfile(@Request() req) {
    return {
      login: req.user.login,
      email: req.user.email,
    };
  }
}