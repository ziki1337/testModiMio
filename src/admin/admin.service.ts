import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async registerAdminByScript(email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({ email, password: hashedPassword });
    await this.adminRepository.save(admin);
    console.log(`Admin registered: ${email}`);
  }
}