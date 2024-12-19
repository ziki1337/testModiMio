import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlacklistService } from '../blacklist/blacklist.service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class JwtAdminGuard extends AuthGuard('admin') {
  constructor(private readonly blacklistService: BlacklistService) {
    super();
  }

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (token && await this.blacklistService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    const result = await super.canActivate(context);
    
    return result instanceof Observable ? await firstValueFrom(result) : result;
  }

  private extractToken(request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}