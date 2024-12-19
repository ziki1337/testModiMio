import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from './admin.service';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TOPSECRET',
    });
  }

  async validate(payload: any) {
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('Not an admin');
    }

    const admin = await this.adminService.validateAdmin(payload.sub);
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    return admin;
  }
}