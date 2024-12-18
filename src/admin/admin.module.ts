import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { JwtAdminStrategy } from './jwt-admin.strategy';
//import { JwtAdminAuthGuard } from './jwt-admin.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAdminGuard } from './jwt-auth.guard';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { DatabaseModule } from 'src/database/database.module';
import { BlacklistedToken } from 'src/blacklist/blacklist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User, BlacklistedToken]),  // Подключаем репозиторий Admin
    UserModule,
    JwtModule.register({  // Регистрация JwtModule
      secret: 'TOPSECRET',  // Убедитесь, что это секрет совпадает с тем, что использовали при создании токенов
      signOptions: { expiresIn: '60m' },  // Настройка по умолчанию
    }),
    BlacklistModule,
    DatabaseModule
  ],
  providers: [AdminService, JwtAdminStrategy, JwtAdminGuard, UserService],
  controllers: [AdminController],
})
export class AdminModule {}