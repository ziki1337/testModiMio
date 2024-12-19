import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { JwtAdminStrategy } from './jwt-admin.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAdminGuard } from './jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { BlacklistModule } from '../blacklist/blacklist.module';
import { DatabaseModule } from '../database/database.module';
import { BlacklistedToken } from '../blacklist/blacklist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User, BlacklistedToken]),
    UserModule,
    JwtModule.register({
      secret: 'TOPSECRET', 
      signOptions: { expiresIn: '60m' },
    }),
    BlacklistModule,
    DatabaseModule
  ],
  providers: [AdminService, JwtAdminStrategy, JwtAdminGuard, UserService],
  controllers: [AdminController],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}