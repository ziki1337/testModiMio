import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { DatabaseService } from './database.service';
import { Admin } from '../admin/admin.entity';
import { BlacklistedToken } from '../blacklist/blacklist.entity';
import { UserBlacklistedToken } from '../userblacklist/userblacklist.entity';
import { UserBlacklistModule } from '../userblacklist/userblacklist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, BlacklistedToken, UserBlacklistedToken]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService, TypeOrmModule],  // Экспортируем DatabaseService и TypeOrmModule для других модулей
})
export class DatabaseModule {}