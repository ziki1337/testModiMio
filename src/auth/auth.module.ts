import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { BlacklistModule } from '../blacklist/blacklist.module';
import { DatabaseModule } from '../database/database.module';
import { BlacklistService } from '../blacklist/blacklist.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserBlacklistModule } from '../userblacklist/userblacklist.module';
import { UserBlacklistService } from '../userblacklist/userblacklist.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'TOPSECRET',
      signOptions: { expiresIn: '60m' },
    }),
    BlacklistModule,
    UserBlacklistModule,
    DatabaseModule
  ],
  providers: [AuthService, JwtStrategy, BlacklistService, JwtAuthGuard, UserBlacklistService],
  controllers: [AuthController],
})
export class AuthModule {}