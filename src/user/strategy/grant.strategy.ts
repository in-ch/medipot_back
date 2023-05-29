import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserGrant } from '../entities/user.entitiy';

@Injectable()
export class GrantGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly users: Repository<User>,
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
    const User = await this.users.findOne({
      where: {
        no: UnSignToken.no,
      },
      select: ['grant'],
    });
    if (User.grant !== UserGrant.DOCTOR) {
      throw new HttpException('의사 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }
    return User.grant === UserGrant.DOCTOR;
  }
}
