import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos';
import { AdminService } from '../admin.service';
import { AdminUserOutputCrudDto } from '../dto/admin.user.dto';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('PRIVATE_KEY'),
    });
  }
  async validate(id: string, password: string): Promise<OutputDto<AdminUserOutputCrudDto>> {
    return this.adminService.adminLogin({ id, password });
  }
}
