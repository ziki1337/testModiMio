import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBlacklistedToken } from './userblacklist.entity';
import { UserBlacklistService } from './userblacklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBlacklistedToken])],  // Используем TypeOrmModule для регистрации репозитория
  providers: [UserBlacklistService],
  exports: [UserBlacklistService, TypeOrmModule], 
})
export class UserBlacklistModule {}