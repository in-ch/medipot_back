import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

import { User } from 'src/user/entities/user.entitiy';
import { Auth } from './entities/auth.entitiy';
import {
  AuthEmailParams,
  EmailValidationOutput,
  EmailValidationParams,
  NicknameValidationParams,
  NicknameValidationResponse,
  sendPhoneValidationHeader,
  SendPhoneValidationParams,
  ValidationPhoneHeader,
  ValidationPhoneParams,
} from './dto/auth.dto';
import { EmailService } from 'src/email/email.service';
import { OutputDto } from 'src/commons/dtos';
import { JwtService } from '@nestjs/jwt';
import { AuthPhone } from './entities/auth-phone.entitiy';
import { checkElapsedTime } from 'src/utills/checkElapsedTime';

const createRandNum = (min, max) => {
  var ntemp = Math.floor(Math.random() * (max - min + 1)) + min;
  return ntemp;
};

export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly auths: Repository<Auth>,
    @InjectRepository(AuthPhone) private readonly authsPhone: Repository<AuthPhone>,
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly emailServices: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  private makeSignature(): string {
    const NCP_accessKey = `${process.env.NCP_ACCESS_KEY}`; // access key id (from portal or sub account)
    const NCP_secretKey = `${process.env.NCP_SECRET_KEY}`; // secret key (from portal or sub account)
    const NCP_serviceID = `${process.env.NCP_SERVICE_ID}`;

    const space = ' '; // one space
    const newLine = '\n'; // new line
    const method = 'POST'; // method
    const url2 = `/sms/v2/services/${NCP_serviceID}/messages`;
    const timestamp = Date.now().toString();

    const message = [];
    const hmac = crypto.createHmac('sha256', NCP_secretKey);

    message.push(method);
    message.push(space);
    message.push(url2);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(NCP_accessKey);
    const signature = hmac.update(message.join('')).digest('base64');
    return signature.toString();
  }

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
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
      const existedUsersCount = await this.auths.count({
        where: {
          email,
          code,
          createdAt: MoreThanOrEqual(fiveMinutesAgo),
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
        throw new Error('인증에 실패했습니다.');
      }
    } catch (e) {
      throw new BadRequestException(e);
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

  /**
   * @param {SendPhoneValidationParams} params phone -> 전화번호
   * @description 인증번호를 제대로 보냈으면 true, 아니면 false
   * @return {OutputDto<{ok: boolean}>} message: string
   * @author in-ch, 2023-06-28
   */
  async sendPhoneValidation(
    payload: SendPhoneValidationParams,
    header: sendPhoneValidationHeader,
  ): Promise<OutputDto<{ ok: boolean }>> {
    try {
      const { phone } = payload;
      const USERS = await this.users.find({
        where: {
          phone,
        },
      });
      if (USERS.length > 0) {
        throw new BadRequestException('이미 인증된 휴대번호입니다.');
      }
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;

      const USER = await this.users.findOne({
        where: {
          no,
        },
      });

      if (!!USER.phone) {
        throw new BadRequestException('이미 휴대번호가 인증되었습니다.');
      }

      let code = '';
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
      }

      const serviceId = `${process.env.NCP_SERVICE_ID}`;
      const accessKey = `${process.env.NCP_ACCESS_KEY}`;
      const url_ = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;

      const body = {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01056922949', // 발신자 번호
        content: `[메디팟 휴대전화 인증번호] ${code}`,
        messages: [
          {
            to: phone, // 수신자 번호
          },
        ],
      };
      const options = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-iam-access-key': accessKey,
          'x-ncp-apigw-timestamp': Date.now().toString(),
          'x-ncp-apigw-signature-v2': this.makeSignature(),
        },
      };

      axios
        .post(url_, body, options)
        .then(async (res) => {
          this.authsPhone.save(
            this.authsPhone.create({
              user: USER,
              code: code,
            }),
          );
        })
        .catch(() => {
          return {
            statusCode: 404,
            data: {
              ok: false,
            },
          };
        });

      return {
        statusCode: 200,
        data: {
          ok: true,
        },
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * @param {ValidationPhoneParams} params code -> 인증 코드
   * @description code를 받아서 인증 정보가 있다면 true, 없다면 false
   * @return {OutputDto<{ok: boolean}>} message: string
   * @author in-ch, 2023-06-28
   */
  async phoneValidation(
    payload: ValidationPhoneParams,
    header: ValidationPhoneHeader,
  ): Promise<OutputDto<{ ok: boolean; phone?: string }>> {
    try {
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;
      const { code, phone } = payload;

      const AUTH = await this.authsPhone.findOne({
        where: {
          code,
          user: {
            no,
          },
        },
      });
      if (AUTH.code !== code) {
        throw new BadRequestException('인증번호가 틀렸습니다.');
      }
      const timeCheck: boolean = await checkElapsedTime(AUTH.createdAt.toString());
      if (timeCheck) {
        throw new BadRequestException('인증시간이 5분이상 초과하였습니다.');
      } else {
        const USER = await this.users.findOne({
          where: {
            no,
          },
        });
        USER.phone = phone;
        await this.users.save(USER);

        await this.authsPhone.delete(AUTH.no);
        return {
          statusCode: 200,
          data: {
            ok: true,
            phone,
          },
        };
      }
    } catch (e) {
      console.log({
        e,
      });
      return {
        statusCode: 400,
        error: e,
        data: {
          ok: false,
        },
      };
    }
  }
}
