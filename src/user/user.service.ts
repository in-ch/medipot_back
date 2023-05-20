import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { OutputDto } from 'src/commons/dtos';
import { User, UserGrant } from './entities/user.entitiy';
import { JwtService } from '@nestjs/jwt';
import {
  GetUserGrantHeader,
  MeInputDto,
  MeOutputCrudDto,
  RefreshOutputDto,
  RefreshParams,
  RequestGrantCrudDto,
  RequestGrantHeaderDto,
  SearchUserCrudDto,
  UpdateProfileCrudDto,
  UpdateProfileHeaderDto,
  UpdateProfileOutputDto,
  UserCreateInputCrudDto,
  UserCreateOutputCrudDto,
  UserLoginCrudDto,
  UserLoginOutputCrudDto,
} from './dto/user.dto';
import { Request } from 'express';
import { UserGrantRequest } from './entities/doctorGrant.entitiy';

const bcrypt = require('bcrypt'); // 패스워드 암호화

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(UserGrantRequest)
    private readonly userGrantRequests: Repository<UserGrantRequest>,

    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param {string} plainTextPassword 비밀번호
   * @param {string} plainTextPassword 암호화된 비밀번호
   * @description 암호화된 비밀번호와 비밀번호를 비교한다.
   * @return {void | Error} 암호 비교 결과
   * @author in-ch, 2022-12-12
   */
  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('비밀번호가 틀렸습니다.', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @param {UserCreateInputCrudDto} payload 생성할 유저 정보
   * @description 유저를 생성한다.
   * @return {OutputDto<UserCreateOutputCrudDto>}
   * @author in-ch, 2023-01-18
   */
  async createUser(payload: UserCreateInputCrudDto): Promise<OutputDto<UserCreateOutputCrudDto>> {
    try {
      const newUserData = this.users.create({
        ...payload,
      });
      const encryptedPassowrd = bcrypt.hashSync(newUserData.password, 10);
      const newUser = await this.users.save({
        ...newUserData,
        password: encryptedPassowrd,
      });
      const access_token = await this.jwtService.sign(
        {
          ...newUser,
          password: '11',
        },
        {
          expiresIn: 60 * 60,
        },
      );
      const refresh_token = await this.jwtService.sign(
        {
          ...newUser,
          password: '11',
        },
        {
          expiresIn: 60 * 60 * 24,
        },
      );

      newUser.token = access_token;
      newUser.refresh_token = refresh_token;

      await this.users.save(newUser);

      return {
        statusCode: 200,
        data: {
          email: (await newUser).email,
          nickname: (await newUser).nickname,
          password: encryptedPassowrd,
          marketingConsent: (await newUser).marketingConsent,
          access_token: access_token,
          refresh_token,
        },
      };
    } catch (e) {
      console.error(`createUser API Error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {string} id 유저의 아이디
   * @description 이름으로 유저 정보를 가져온다.
   * @return {OutputDto<AdminUserOutputCrudDto>}
   * @author in-ch, 2023-01-26
   */
  async findOneUser(id: string): Promise<OutputDto<UserLoginOutputCrudDto>> {
    try {
      const User = await this.users.findOne({
        where: {
          no: Number(id),
        },
      });
      return {
        statusCode: 200,
        data: User,
      };
    } catch (e) {
      console.error(`findOneUser Error: ${e}`);
    }
  }

  /**
   * @param {string} email 이메일
   * @param {string} password 비밀번호
   * @description 아이디와 비밀번호 로그인을 한다.
   * @return {OutputDto<UserLoginOutputCrudDto>}
   * @author in-ch, 2023-01-21
   */
  async login(payload: UserLoginCrudDto): Promise<OutputDto<UserLoginOutputCrudDto>> {
    try {
      const { email, password } = payload;
      const user = await this.users.findOne({
        where: {
          email,
          isSocialLogin: false,
        },
        select: ['password', 'email', 'token', 'refresh_token', 'nickname', 'profile', 'no'],
      });

      await this.verifyPassword(password, user.password);
      const access_token = await this.jwtService.sign(
        {
          ...user,
          token: '',
          refresh_token: '',
        },
        {
          expiresIn: 60 * 60,
        },
      );

      const refresh_token = await this.jwtService.sign(
        {
          ...user,
          token: '',
          refresh_token: '',
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
        },
      );

      user.token = await access_token;
      user.refresh_token = await refresh_token;

      await this.users.save(user);

      return {
        statusCode: 200,
        data: {
          ...user,
          token: access_token,
          refresh_token,
        },
      };
    } catch (e) {
      console.error(`Login API Error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {number} no 유저 넘버
   * @param {string} authorization 엑세스 토큰
   * @param {string} refresh_token 리프레쉬 토큰
   * @description 리프레쉬를 발급한다.
   * @return {OutputDto<RefreshOutputDto>}
   * @author in-ch, 2023-04-03
   */
  async refresh(payload: RefreshParams): Promise<OutputDto<RefreshOutputDto>> {
    try {
      const { no, refresh_token } = payload;
      const USER = await this.users.findOne({
        where: {
          no,
        },
        select: ['password', 'email', 'token', 'refresh_token', 'nickname', 'profile', 'no'],
      });

      if (USER.refresh_token !== refresh_token) {
        throw new BadRequestException('리프레쉬 토큰이 변조되었습니다.');
      }
      const verify = await this.jwtService.verify(refresh_token, {
        secret: process.env.PRIVATE_KEY,
      });
      if (!verify) {
        throw new NotAcceptableException(`리프레쉬 토큰이 만료되었습니다.`);
      } else {
        const access_token = await this.jwtService.sign(
          {
            ...USER,
            token: '',
            refresh_token: '',
          },
          {
            expiresIn: 60 * 60,
          },
        );

        USER.token = await access_token;
        await this.users.save(USER);

        return {
          statusCode: 200,
          data: {
            authorization: access_token,
          },
        };
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async me(header: MeInputDto): Promise<OutputDto<MeOutputCrudDto>> {
    try {
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      return {
        statusCode: 200,
        data: UnSignToken,
      };
    } catch (e) {
      console.error(`me API Error: ${e}`);
      throw e;
    }
  }

  async updateProfile(
    payload: UpdateProfileCrudDto,
    header: UpdateProfileHeaderDto,
  ): Promise<OutputDto<UpdateProfileOutputDto>> {
    try {
      const { authorization } = header;
      const { profile, nickname } = payload;

      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const User = await this.users.findOne({
        where: {
          no: UnSignToken.no,
        },
      });
      User.nickname = nickname ? nickname : User.nickname;
      User.profile = profile ? profile : User.profile;
      await this.users.save(User);
      return {
        statusCode: 200,
        data: User,
      };
    } catch (e) {
      console.error(`updateProfile API Error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {SearchUserCrudDto} payload
   * @description 유저를 검색한다.
   * @return {OutputDto<User>}
   * @author in-ch, 2023-03-13
   */
  async searchUser(request: Request<SearchUserCrudDto>): Promise<OutputDto<User>> {
    try {
      const {
        query: { no },
      } = request;
      const User = await this.users.findOne({
        where: {
          no: Number(no),
          deletedAt: IsNull(),
        },
      });
      return {
        statusCode: 200,
        data: User,
      };
    } catch (e) {
      console.error(`searchUser API Error: ${e}`);
      throw new BadRequestException('유저가 존재하지 않습니다.');
    }
  }

  /**
   * @param {GetUserGrantHeader} header
   * @description 유저의 grant를 리턴한다.
   * @return {OutputDto<User>}
   * @author in-ch, 2023-05-16
   */
  async getUserGrant(header: GetUserGrantHeader): Promise<OutputDto<UserGrant>> {
    try {
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const User = await this.users.findOne({
        where: {
          no: UnSignToken.no,
        },
        select: ['grant'],
      });
      return {
        statusCode: 200,
        data: User.grant,
      };
    } catch (e) {
      console.error(`getUserGrant API Error: ${e}`);
      throw new BadRequestException('유저 grant 정보를 가져오는데 실패했습니다..');
    }
  }

  /**
   * @param {GetGrantCrudDto} payload -> license: license img url 주소
   * @param {GetGrantHeaderDto} header ->
   * @description 유저가 의사 권한을 요청한다.
   * @return {OutputDto<boolean>}
   * @author in-ch, 2023-05-20
   */
  async requestGrant(
    payload: RequestGrantCrudDto,
    header: RequestGrantHeaderDto,
  ): Promise<OutputDto<boolean>> {
    try {
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const User = await this.users.findOne({
        where: {
          no: UnSignToken.no,
        },
        select: ['grant'],
      });
      if (User.grant === UserGrant.DOCTOR)
        throw new BadRequestException('이미 의사 권한을 가지고 있습니다.');
      await this.userGrantRequests.create(
        await this.userGrantRequests.save({
          user: User,
          license: payload.license,
        }),
      );
      return {
        statusCode: 200,
        data: true,
      };
    } catch (e) {
      console.error(`requestGrant API Error: ${e}`);
      throw new BadRequestException(`requestGrant API Error: ${e}`);
    }
  }
}
