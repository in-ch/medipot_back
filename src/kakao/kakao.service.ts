import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom } from 'rxjs';
import { Faker, ko } from '@faker-js/faker';

import {
  KakaoLoginInputDto,
  KakaoLoginOutputDto,
  LogoutInputDto,
  LogoutOutputDto,
  MeInputDto,
  RefreshInputDto,
  RefreshOkOutputDto,
} from './dto/kakao.dto';
import { LOGIN_REGISTER_TYPE, OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';

const faker = new Faker({
  locale: [ko],
});

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
        statusCode: 200,
        data,
      };
    } catch (e) {
      console.error(`kakao me error:  ${e}`);
      throw e;
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
        statusCode: 200,
        data,
      };
    } catch (e) {
      console.error(`kakao refresh error:  ${e}`);
      throw e;
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
        statusCode: 200,
        data,
      };
    } catch (e) {
      console.error(`kakao logout error:  ${e}`);
      throw e;
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
        const access_token = await this.jwtService.sign(
          {
            ...User,
            token: '',
            refresh_token: '',
            password: '11',
          },
          {
            expiresIn: 1000 * 60 * 60 * 30,
          },
        );

        const refresh_token = await this.jwtService.sign(
          {
            ...User,
            token: '',
            refresh_token: '',
            password: '22',
          },
          {
            expiresIn: 1000 * 60 * 60 * 60 * 24,
          },
        );

        User.token = access_token;
        User.refresh_token = refresh_token;
        await this.users.save(User);

        return {
          statusCode: 200,
          type: LOGIN_REGISTER_TYPE.login,
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
          nickname: faker.internet.userName({ firstName: 'unknown' }),
          profile: thumbnail_image_url,
          isSocialLogin: true,
        });
        await this.users.save(NewUser);

        const access_token = await this.jwtService.sign(
          {
            ...NewUser,
            password: '11',
          },
          {
            expiresIn: 1000 * 60 * 60 * 30,
          },
        );
        const refresh_token = this.jwtService.sign(
          {
            ...NewUser,
            password: '11',
          },
          {
            expiresIn: 1000 * 60 * 60 * 60 * 24,
          },
        );

        NewUser.token = access_token;
        NewUser.refresh_token = refresh_token;
        await this.users.save(NewUser);
        return {
          statusCode: 200,
          type: LOGIN_REGISTER_TYPE.register,
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
      console.error(`kakao login error: ${e}`);
      throw e;
    }
  }
}
