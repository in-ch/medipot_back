import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { LOGIN_REGISTER_TYPE, OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
import { MePayloadDto, NaverLoginOutputDto } from './dto/naver.dto';

@Injectable()
export class NaverService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async me(payload: MePayloadDto): Promise<OutputDto<NaverLoginOutputDto>> {
    try {
      const { accessToken } = payload;
      const {
        data: { response },
      } = await firstValueFrom(
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

      const User = await this.users.findOne({
        where: {
          email: response.email,
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

        const { email, name, profile_image, mobile } = await response;

        const NewUser = await this.users.create({
          email,
          nickname: name,
          profile: profile_image,
          isSocialLogin: true,
          phone: mobile.replaceAll('-', ''),
          password: '#!@$!ASAFAZXCVASDG',
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
            email: NewUser.email,
            nickname: NewUser.nickname,
            password: '1',
            marketingConsent: NewUser.marketingConsent,
            token: access_token,
            refresh_token,
          },
        };
      }
    } catch (e) {
      console.error(`kakao me error:  ${e}`);
      throw e;
    }
  }
}
