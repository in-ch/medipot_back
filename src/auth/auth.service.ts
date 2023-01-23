import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entitiy';
import { Auth } from './entities/auth.entitiy';
import { AuthEmailParams } from './dto/auth.dto';
import { EmailService } from 'src/email/email.service';

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
        return {
          isDone: false,
          status: 400,
          error: `이미 존재하는 이메일입니다.`,
        };
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
        isDone: true,
        status: 200,
        message: '이메일 보냈습니다.',
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: `서버 에러가 발생하였습니다. auth email ${e}`,
      };
    }
  }
}
