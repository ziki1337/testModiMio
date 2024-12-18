import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedToken } from './blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistedToken])],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}