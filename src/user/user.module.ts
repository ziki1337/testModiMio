import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ProfileController, UserController } from './user.controller';
import { BlacklistedToken } from 'src/blacklist/blacklist.entity';
import { DatabaseModule } from 'src/database/database.module';
import { Admin } from '../admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, BlacklistedToken]),
    DatabaseModule
  ],
  providers: [UserService],
  controllers: [UserController, ProfileController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
