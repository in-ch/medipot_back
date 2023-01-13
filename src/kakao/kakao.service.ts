import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  LogoutInputDto,
  LogoutOutputDto,
  MeErrorOutputDto,
  MeInputDto,
  MeOkOutputDto,
  RefreshInputDto,
  RefreshOkOutputDto,
} from './dto/kakao.dto';
import { OutputDto } from 'src/commons/dtos';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoService {
  constructor(private readonly httpService: HttpService) {}

  async me(header: MeInputDto): Promise<OutputDto<MeOkOutputDto | MeErrorOutputDto>> {
    try {
      const { authorization } = header;
      const { data } = await firstValueFrom(
        this.httpService
          .get(`${process.env.KAKAO_API}/v2/user/me`, {
            headers: {
              ContentType: 'application/x-www-form-urlencoded',
              Authorization: `${authorization}`,
            },
          })
          .pipe(
            catchError((error) => {
              throw error;
            }),
          ),
      );
      return {
        isDone: true,
        status: 200,
        data,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: '서버 에러가 발생하였습니다. Kakao me',
      };
    }
  }

  async refresh(payload: RefreshInputDto): Promise<OutputDto<RefreshOkOutputDto>> {
    try {
      const { refresh_token } = payload;

      console.log(
        `${process.env.KAKAO_API}/oauth/token?grant_type=refresh_token&client_id=${process.env.KAKAO_API_KEY}&refresh_token=${refresh_token}`,
      );
      const { data } = await firstValueFrom(
        this.httpService
          .post(
            `${process.env.KAKAO_API_REFRESH}/oauth/token?grant_type=refresh_token&client_id=${process.env.KAKAO_API_KEY}&refresh_token=${refresh_token}`,
            {
              headers: {
                ContentType: 'multipart/form-data',
              },
            },
          )
          .pipe(
            catchError((error) => {
              console.error(error);
              throw error;
            }),
          ),
      );
      return {
        isDone: true,
        status: 200,
        data,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: '서버 에러가 발생하였습니다. Kakao refresh',
      };
    }
  }

  async logout(header: LogoutInputDto): Promise<OutputDto<LogoutOutputDto>> {
    try {
      const { authorization } = header;
      const { data } = await firstValueFrom(
        this.httpService
          .post(`${process.env.KAKAO_API}/v1/user/logout`, {
            headers: {
              ContentType: 'application/x-www-form-urlencoded',
              Authorization: `${authorization}`,
            },
          })
          .pipe(
            catchError((error) => {
              console.error(error);
              throw error;
            }),
          ),
      );
      return {
        isDone: true,
        status: 200,
        data,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: '서버 에러가 발생하였습니다. Kakao logout',
      };
    }
  }
}
