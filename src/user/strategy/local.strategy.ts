import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UserService } from '../user.service';
import { AdminUser } from '../entities/user.entitiy';
import { AdminUserOutputCrudDto } from '../dto/admin.user.dto';
import { OutputDto } from 'src/commons/dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'id',
    });
  }
  async validate(id: string, password: string): Promise<OutputDto<AdminUserOutputCrudDto>> {
    return this.userService.adminLogin(id, password);
  }
}