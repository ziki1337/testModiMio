import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // импортируем модуль пользователя
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { BlacklistModule } from '../blacklist/blacklist.module';  // Импортируем BlacklistModule
import { DatabaseModule } from 'src/database/database.module';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UserModule, // Модуль пользователя уже импортирован
    PassportModule,
    JwtModule.register({
      secret: 'TOPSECRET',
      signOptions: { expiresIn: '60m' },
    }),
    BlacklistModule,  // Импортируем BlacklistModule для доступности BlacklistService
    DatabaseModule
  ],
  providers: [AuthService, JwtStrategy, BlacklistService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}