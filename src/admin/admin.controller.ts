import { Controller, Post, Body, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UserService } from '../user/user.service';
import { JwtAdminGuard } from './jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() adminLoginDto: AdminLoginDto) {
    return this.adminService.loginAdmin(adminLoginDto);
  }

  @Post('protected')
  @UseGuards(JwtAdminGuard)
  async protectedRoute(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const users = await this.userService.findAllPaginated(page, limit);
    return {
      data: users.data,
      total: users.total,
      page: page,
      limit: limit,
    };
  }
}