import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TOPSECRET',
    });
  }

  async validate(payload: any) {
    // Проверяем роль пользователя
    if (payload.role !== 'user') {
      throw new UnauthorizedException('Not a user');
    }

    return { userId: payload.sub, username: payload.username, email: payload.email };
  }
}