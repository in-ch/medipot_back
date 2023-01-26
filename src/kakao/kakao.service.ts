import { Injectable, UseFilters } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  KakaoLoginInputDto,
  KakaoLoginOutputDto,
  LogoutInputDto,
  LogoutOutputDto,
  MeInputDto,
  RefreshInputDto,
  RefreshOkOutputDto,
} from './dto/kakao.dto';
import { OutputDto } from 'src/commons/dtos';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from 'src/user/entities/user.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class KakaoService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async me(header: MeInputDto) {
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
          .post(
            `${process.env.KAKAO_API}/v1/user/logout`,
            {},
            {
              headers: {
                ContentType: 'application/x-www-form-urlencoded',
                Authorization: `${authorization}`,
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
        error: '서버 에러가 발생하였습니다. Kakao logout',
      };
    }
  }

  /**
   * @param {KakaoLoginInputDto} authorization access token
   * @description 카카오 로그인을 실시한다.
   * @return {OutputDto<KakaoLoginOutputDto>}
   * @author in-ch, 2023-01-26
   */
  async kakaoLogin(params: KakaoLoginInputDto): Promise<OutputDto<KakaoLoginOutputDto>> {
    try {
      const { authorization } = params;
      const results = await this.me({
        authorization: `Bearer ${authorization}`,
      });
      const {
        data: {
          kakao_account: {
            profile: { nickname, thumbnail_image_url },
            email,
          },
        },
      } = results;

      const User = await this.users.findOne({
        where: {
          email,
          isSocialLogin: true,
        },
      });

      if (Number(User?.no) > 0) {
        // 로그인 실시
        const access_token = await this.jwtService.sign({
          ...User,
          token: '',
          refresh_token: '',
          password: '11',
        });

        const refresh_token = await this.jwtService.sign(
          {
            ...User,
            token: '',
            refresh_token: '',
            password: '22',
          },
          {
            expiresIn: '100s',
          },
        );
        return {
          isDone: true,
          status: 200,
          data: {
            ...User,
            token: access_token,
            refresh_token,
          },
        };
      } else {
        // 회원 가입 실시
        const NewUser = await this.users.create({
          email,
          password: '#!@$!ASAFAZXCVASDG!@$!@$!@%!@%!@$!@#SFSERQDAFASDGAS!@%!YGBXCV',
          nickname,
          profile: thumbnail_image_url,
          isSocialLogin: true,
        });
        await this.users.save(NewUser);

        const access_token = this.jwtService.sign(
          {
            ...NewUser,
            password: '11',
          },
          {
            expiresIn: '1800000',
          },
        );
        const refresh_token = this.jwtService.sign(
          {
            ...NewUser,
            password: '11',
          },
          {
            expiresIn: '604800000',
          },
        );
        return {
          isDone: true,
          status: 200,
          data: {
            email: (await NewUser).email,
            nickname: (await NewUser).nickname,
            password: '1',
            marketingConsent: (await NewUser).marketingConsent,
            token: access_token,
            refresh_token,
          },
        };
      }
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: '서버 에러가 발생하였습니다. Kakao login' + e,
      };
    }
  }
}
