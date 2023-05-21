import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../entities/admin-user.entitiy';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @InjectRepository(AdminUser) private readonly admins: Repository<AdminUser>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return false;
    }

    const UnSignToken = await this.jwtService.verify(authorizationHeader.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const Admin = await this.admins.findOne({
      where: {
        no: Number(UnSignToken.no),
      },
    });
    return !!Admin.no;
  }
}
