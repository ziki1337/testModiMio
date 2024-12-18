import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBlacklistedToken } from './userblacklist.entity';

@Injectable()
export class UserBlacklistService {
  constructor(
    @InjectRepository(UserBlacklistedToken)
    private readonly userBlacklistRepository: Repository<UserBlacklistedToken>,
  ) {}

  async blacklistToken(token: string, expiresAt: Date): Promise<void> {
    const blacklistedToken = this.userBlacklistRepository.create({ token, expiresAt });
    await this.userBlacklistRepository.save(blacklistedToken);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.userBlacklistRepository.findOne({ where: { token } });
    return !!blacklistedToken;
  }
}