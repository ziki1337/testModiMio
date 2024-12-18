import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistedToken } from './blacklist.entity';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistedToken)
    private readonly blacklistedTokenRepository: Repository<BlacklistedToken>,
  ) {}

  async addTokenToBlacklist(token: string, expiresAt: Date) {
    const blacklistedToken = new BlacklistedToken();
    blacklistedToken.token = token;
    blacklistedToken.expiresAt = expiresAt;

    await this.blacklistedTokenRepository.save(blacklistedToken);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.blacklistedTokenRepository.findOne({
      where: { token },
    });
    return !!blacklistedToken;  // Возвращаем true, если токен в черном списке
  }
}