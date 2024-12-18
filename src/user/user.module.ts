import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ProfileController, UserController } from './user.controller';
import { BlacklistedToken } from '../blacklist/blacklist.entity';
import { DatabaseModule } from 'src/database/database.module';
import { Admin } from '../admin/admin.entity';
import { UserBlacklistModule } from '../userblacklist/userblacklist.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtUserGuard } from '../userblacklist/jwt-user.guard';
import { JwtUserStrategy } from '../userblacklist/jwt-user.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, BlacklistedToken]),
    JwtModule.register({
      secret: 'TOPSECRET',
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule.register({ defaultStrategy: 'user' }),
    UserBlacklistModule,  // Подключаем UserBlacklistModule
  ],
  providers: [UserService, JwtUserStrategy, JwtUserGuard],
  controllers: [UserController, ProfileController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
