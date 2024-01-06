import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AdminUser } from './entities/admin-user.entitiy';
import {
  AdminUserCreateCrudDto,
  AdminUserLoginCrudDto,
  AdminUserOutputCrudDto,
  AdminUserRefreshCrudDto,
  AdminUserRefreshOutputCrudDto,
} from './dto/admin.user.dto';
import { OutputDto } from 'src/commons/dtos';

const bcrypt = require('bcryptjs'); // 패스워드 암호화

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminUser) private readonly adminUsers: Repository<AdminUser>,
    private readonly jwtService: JwtService,
  ) {}

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('비밀번호가 틀렸습니다.', HttpStatus.BAD_REQUEST);
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
      const EXIST_USER = await this.adminUsers.findOne({
        where: {
          id: payload.id,
        },
        select: ['password', 'id', 'token', 'refresh_token', 'name', 'no'],
      });
      if (EXIST_USER?.no) {
        throw new ConflictException('이미 존재하는 아이디입니다.');
      }
      const newAdminUser = await this.adminUsers.create({
        ...payload,
        token: ' ',
        refresh_token: ' ',
      });
      const encryptedPassowrd = bcrypt.hashSync(newAdminUser.password, 10);

      const newAdmin = await this.adminUsers.save({
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

      const refresh_token = await this.jwtService.sign(
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
        statusCode: 200,
        data: {
          ...newAdminUser,
          password: encryptedPassowrd,
          token: access_token,
          refresh_token,
        },
      };
    } catch (e) {
      console.error(`create Admin User Error: ${e}`);
      throw e;
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
        statusCode: 200,
        data: adminUser,
      };
    } catch (e) {
      console.error(`findOneAdminUser API Error: ${e}`);
      throw e;
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
        select: ['no', 'password', 'id', 'token', 'refresh_token', 'name', 'grant'],
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
      adminUser.token = access_token;
      adminUser.refresh_token = refresh_token;

      await this.adminUsers.save(adminUser);

      return {
        statusCode: 200,
        data: {
          ...adminUser,
        },
      };
    } catch (e) {
      console.error(`adminLogin API Error: ${e}`);
      throw e;
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
      const { id, refresh_token } = payload;

      const verify = this.jwtService.verify(refresh_token, { secret: process.env.PRIVATE_KEY });
      if (!verify) {
        throw new NotAcceptableException(`리프레쉬 토큰이 만료되었습니다.`);
      }
      const getAdmin = await this.adminUsers.findOne({
        where: {
          id,
          refresh_token,
        },
        select: ['password', 'id', 'token', 'refresh_token', 'name'],
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
        statusCode: 200,
        data: {
          ...getAdmin,
          token: new_access_token,
        },
      };
    } catch (e) {
      throw e;
    }
  }
}
