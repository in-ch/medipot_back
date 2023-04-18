import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';

import { User } from 'src/user/entities/user.entitiy';
import { Auth } from './entities/auth.entitiy';
import {
  AuthEmailParams,
  EmailValidationOutput,
  EmailValidationParams,
  NicknameValidationParams,
  NicknameValidationResponse,
} from './dto/auth.dto';
import { EmailService } from 'src/email/email.service';
import { OutputDto } from 'src/commons/dtos';

const createRandNum = (min, max) => {
  var ntemp = Math.floor(Math.random() * (max - min + 1)) + min;
  return ntemp;
};

export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly auths: Repository<Auth>,
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly emailServices: EmailService,
  ) {}

  /**
   * @param {AuthEmailParams} params email
   * @description email을 받아 중복체크를 하고 중복이 아니면 이메일을 보내준다. 그리고 auths에 인증번호 저장
   * @return {OutputDto<AuthEmailOutput>} message: string
   * @author in-ch, 2023-01-23
   */
  async sendAuthEmail(params: AuthEmailParams) {
    try {
      const { email } = params;
      const existedUsersCount = await this.users.count({
        where: {
          email,
        },
      });
      if (existedUsersCount > 0) {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }
      const verificationCode = createRandNum(111111, 999999);

      this.emailServices.sendEmail({
        to: email,
        subject: '[메디팟] 회원 가입 이메일 인증 번호입니다.',
        html: `<h3>[메디팟] 이메일 인증 번호입니다.</h3><br/><p>인증번호: <span style="font-weight:600; color:'#2c40b7'">${verificationCode}</span></p><br/><br/><p>감사합니다.</p><br/><p>메디팟 Team</p>`,
      });

      this.auths.save(
        this.auths.create({
          email,
          code: verificationCode,
        }),
      );

      return {
        statusCode: 200,
        message: '이메일 전송이 완료되었습니다.',
        data: {
          message: '이메일 전송이 완료되었습니다.',
        },
      };
    } catch (e) {
      throw e;
    }
  }

  /**
   * @param {EmailValidationParams} params email -> 이메일, code -> 인증 코드
   * @description email, code를 받아서 인증 정보가 있다면 true, 없다면 false
   * @return {OutputDto<EmailValidationOutput>} message: string
   * @author in-ch, 2023-01-23
   */
  async emailValidation(params: EmailValidationParams): Promise<OutputDto<EmailValidationOutput>> {
    try {
      const { email, code } = params;
      const existedUsersCount = await this.auths.count({
        where: {
          email,
          code,
        },
      });
      if (existedUsersCount > 0) {
        await this.auths.delete({
          email,
          code,
        });
        return {
          statusCode: 200,
          data: {
            message: '인증 성공',
          },
        };
      } else {
        throw new BadRequestException('인증에 실패했습니다.');
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * @param {NicknameValidationParams} params nickname -> 닉네임
   * @description nickname을 받아 중복이면 false, 아니면 true
   * @return {OutputDto<NicknameValidationResponse>}
   * @author in-ch, 2023-01-24
   */
  async nicknameValidation(
    params: NicknameValidationParams,
  ): Promise<OutputDto<NicknameValidationResponse>> {
    try {
      const { nickname } = params;
      const existedUsersCount = await this.users.count({
        where: {
          nickname,
        },
      });
      if (existedUsersCount > 0) {
        throw new ConflictException('이미 존재하는 닉네임입니다.');
      } else {
        return {
          message: '닉네임 중복 확인이 완료되었습니다.',
          statusCode: 200,
        };
      }
    } catch (e) {
      throw e;
    }
  }
}
