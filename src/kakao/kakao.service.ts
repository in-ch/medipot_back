import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MeErrorOutputDto, MeInputDto, MeOkOutputDto } from './dto/kakao.dto';
import { OutputDto } from 'src/commons/dtos';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoService {
  constructor(private readonly httpService: HttpService) {}

  async me(payload: MeInputDto): Promise<OutputDto<MeOkOutputDto | MeErrorOutputDto>> {
    try {
      const { access_token } = payload;
      console.log(access_token);
      const { data } = await firstValueFrom(
        this.httpService
          .get(`${process.env.KAKAO_API}/v2/user/me`, {
            headers: {
              ContentType: 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${access_token}`,
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
}
