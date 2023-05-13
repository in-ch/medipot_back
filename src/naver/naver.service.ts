import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { MeInputDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
import { MePayloadDto } from './dto/naver.dto';

@Injectable()
export class NaverService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async me(payload: MePayloadDto) {
    try {
      const { accessToken } = payload;
      const { data } = await firstValueFrom(
        this.httpService
          .get(`${process.env.NAVER_API}/me`, {
            headers: {
              ContentType: 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .pipe(
            catchError((error) => {
              throw error;
            }),
          ),
      );
      return {
        statusCode: 200,
        data,
      };
    } catch (e) {
      console.error(`kakao me error:  ${e}`);
      throw e;
    }
  }
}
