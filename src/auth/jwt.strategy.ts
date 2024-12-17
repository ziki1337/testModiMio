import { Injectable } from '@nestjs/common';
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
    // Добавим больше данных из токена, чтобы мы могли получить их в контроллере
    return { userId: payload.sub, username: payload.username, email: payload.email };
  }
}