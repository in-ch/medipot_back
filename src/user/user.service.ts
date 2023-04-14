import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import {
  AdminUserCreateCrudDto,
  AdminUserLoginCrudDto,
  AdminUserOutputCrudDto,
  AdminUserRefreshCrudDto,
  AdminUserRefreshOutputCrudDto,
} from './dto/admin.user.dto';
import { OutputDto } from 'src/commons/dtos';
import { AdminUser, User } from './entities/user.entitiy';
import { JwtService } from '@nestjs/jwt';
import {
  MeInputDto,
  MeOutputCrudDto,
  RefreshOutputDto,
  RefreshParams,
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

const bcrypt = require('bcrypt'); // 패스워드 암호화

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AdminUser) private readonly adminUsers: Repository<AdminUser>,
    @InjectRepository(User) private readonly users: Repository<User>,

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
      throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
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
        isDone: true,
        status: 200,
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
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }

  /**
   * @param {AdminUserCreateCrudDto} payload 생성할 유저 정보
   * @description 어드민 유저를 생성한다.
   * @return {OutputDto<AdminUserOutputCrudDto>}
   * @author in-ch, 2022-12-12
   */
  async createAdminUser(
    payload: AdminUserCreateCrudDto,
  ): Promise<OutputDto<AdminUserOutputCrudDto>> {
    try {
      const newAdminUser = this.adminUsers.create({
        ...payload,
        token: ' ',
        refresh_token: ' ',
      });
      const encryptedPassowrd = bcrypt.hashSync(newAdminUser.password, 10);

      const newAdmin = this.adminUsers.save({
        ...newAdminUser,
        password: encryptedPassowrd,
      });
      const access_token = this.jwtService.sign(
        {
          ...newAdmin,
          token: '',
          refresh_token: '',
          password: '11',
        },
        {
          expiresIn: 60 * 60,
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          ...newAdmin,
          token: '',
          refresh_token: '',
          password: '22',
        },
        {
          expiresIn: 60 * 60 * 24,
        },
      );
      return {
        isDone: true,
        status: 200,
        data: {
          ...newAdminUser,
          password: encryptedPassowrd,
          token: access_token,
          refresh_token,
        },
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
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
        isDone: true,
        status: 200,
        data: User,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }

  /**
   * @param {string} id 유저의 아이디
   * @description 이름으로 유저 정보를 가져온다.
   * @return {OutputDto<AdminUserOutputCrudDto>}
   * @author in-ch, 2022-12-12
   */
  async findOneAdminUser(id: string): Promise<OutputDto<AdminUserOutputCrudDto>> {
    try {
      const adminUser = await this.adminUsers.findOne({
        where: {
          id,
        },
      });
      return {
        isDone: true,
        status: 200,
        data: adminUser,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
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
        isDone: true,
        status: 200,
        data: {
          ...user,
          token: access_token,
          refresh_token,
        },
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
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
      });

      if (USER.refresh_token !== refresh_token) {
        return {
          isDone: false,
          status: 400,
          error: '리프레쉬 토큰이 변조되었습니다.',
        };
      }
      const verify = await this.jwtService.verify(refresh_token, {
        secret: process.env.PRIVATE_KEY,
      });
      if (!verify) {
        return {
          isDone: false,
          status: 400,
          error: '리프레쉬 토큰이 만료되었습니다.',
        };
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
          isDone: true,
          status: 200,
          data: {
            authorization: access_token,
          },
        };
      }
    } catch (e) {
      console.error(e);
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }

  /**
   * @param {string} id 아이디
   * @param {string} password 비밀번호
   * @description 아이디와 비밀번호 어드민 로그인을 한다.
   * @return {OutputDto<AdminUserOutputCrudDto>}
   * @author in-ch, 2022-12-12
   */
  async adminLogin(payload: AdminUserLoginCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>> {
    try {
      const { id, password } = payload;
      const adminUser = await this.adminUsers.findOne({
        where: {
          id,
        },
      });
      await this.verifyPassword(password, adminUser.password);
      const access_token = await this.jwtService.sign(
        {
          ...adminUser,
          token: '',
          refresh_token: '',
          password: '11',
        },
        {
          expiresIn: 60 * 60,
        },
      );

      const refresh_token = await this.jwtService.sign(
        {
          ...adminUser,
          token: '',
          refresh_token: '',
          password: '22',
        },
        {
          expiresIn: 60 * 60 * 24,
        },
      );
      await this.adminUsers.save({
        ...adminUser,
        token: access_token,
        refresh_token,
      });
      return {
        isDone: true,
        status: 200,
        data: {
          ...adminUser,
          token: access_token,
          refresh_token,
        },
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }

  /**
   * @param {AdminUserRefreshCrudDto} payload
   * @description 리프레쉬 토큰을 발급한다.
   * @return {OutputDto<AdminUserRefreshOutputCrudDto>}
   * @author in-ch, 2022-12-15
   */
  async adminRefresh(
    payload: AdminUserRefreshCrudDto,
  ): Promise<OutputDto<AdminUserRefreshOutputCrudDto>> {
    try {
      const { name, refresh_token } = payload;
      const verify = this.jwtService.verify(refresh_token, { secret: process.env.PRIVATE_KEY });
      if (!verify) {
        return {
          isDone: false,
          status: 400,
          error: '리프레쉬 토큰이 만료되었습니다.',
        };
      }
      const getAdmin = await this.adminUsers.findOne({
        where: {
          name,
          refresh_token,
        },
      });
      const new_access_token = await this.jwtService.sign(
        {
          ...getAdmin,
          token: '',
          refresh_token: '',
          password: '11',
        },
        {
          expiresIn: 60 * 60,
        },
      );

      await this.adminUsers.save({
        ...getAdmin,
        token: new_access_token,
      });

      return {
        isDone: true,
        status: 200,
        data: {
          ...getAdmin,
          token: new_access_token,
        },
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }

  async me(header: MeInputDto): Promise<OutputDto<MeOutputCrudDto>> {
    try {
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      return {
        isDone: true,
        status: 200,
        data: UnSignToken,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
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
        isDone: true,
        status: 200,
        data: User,
      };
    } catch (e) {
      console.error(e);
      return {
        isDone: false,
        status: 400,
        error: e,
      };
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
      delete User.password;
      delete User.marketingConsent;
      delete User.isSocialLogin;
      delete User.createdAt;
      delete User.updatedAt;
      delete User.deletedAt;

      return {
        isDone: true,
        status: 200,
        data: User,
      };
    } catch (e) {
      console.error(e);
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }
}
