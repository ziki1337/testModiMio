import { Controller, Post, Body, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/admin-login.dto';
//import { JwtAdminGuard } from './jwt-admin.guard';
import { UserService } from '../user/user.service';  // Импортируем UserService
//import { JwtAdminAuthGuard } from './jwt-admin.guard';
import { JwtAdminGuard } from './jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,  // Инжектируем UserService
  ) {}

  @Post('login')
  async login(@Body() adminLoginDto: AdminLoginDto) {
    return this.adminService.loginAdmin(adminLoginDto);
  }

  @Post('protected')
  @UseGuards(JwtAdminGuard)  // Применяем Guard для защищённого маршрута
  async protectedRoute(
    @Query('page') page = 1,       // Параметр для страницы (по умолчанию 1)
    @Query('limit') limit = 10,    // Параметр для количества записей на страницу (по умолчанию 10)
  ) {
    const users = await this.userService.findAllPaginated(page, limit);  // Используем userService
    return {
      data: users.data,
      total: users.total,
      page: page,
      limit: limit,
    };
  }
}