import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async registerAdminByScript(email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({ email, password: hashedPassword });
    await this.adminRepository.save(admin);
    console.log(`Admin registered: ${email}`);
  }

  async validateAdmin(adminId: number): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { id: adminId } });
  }

  async loginAdmin(adminLoginDto: any): Promise<{ access_token: string }> {
    const { email, password } = adminLoginDto;

    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Генерация JWT токена для администратора
    const payload = {
      sub: admin.id,
      username: admin.email,
      role: 'admin',
    };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}