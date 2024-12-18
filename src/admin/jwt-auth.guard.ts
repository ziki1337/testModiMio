import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlacklistService } from '../blacklist/blacklist.service';
import { firstValueFrom, Observable } from 'rxjs'; // Импортируем firstValueFrom для работы с Observable

@Injectable()
export class JwtAdminGuard extends AuthGuard('admin') {
  constructor(private readonly blacklistService: BlacklistService) {
    super();
  }

  // Переопределяем метод canActivate, чтобы добавить проверку черного списка
  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    // Если токен присутствует, проверяем, не находится ли он в черном списке
    if (token && await this.blacklistService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    // Если токен не черный, продолжаем обычную проверку через AuthGuard
    const result = await super.canActivate(context);  // Получаем результат (boolean или Observable<boolean>)
    
    // Если результат является Observable, преобразуем его в boolean
    return result instanceof Observable ? await firstValueFrom(result) : result;
  }

  // Извлекаем токен из запроса (например, из заголовков Authorization)
  private extractToken(request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}