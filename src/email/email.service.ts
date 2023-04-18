import * as AWS from 'aws-sdk';
import * as NODEMAILER from 'nodemailer';
import { Injectable } from '@nestjs/common';

import { SendEmailParams } from './dto/email.dto';

@Injectable()
export class EmailService {
  /**
   * @param {SendEmailParams} params address -> 수신 이메일 주소, subject -> 제목, html -> 안에 내용
   * @description address 값을 받아 이메일을 보내준다.
   * @return {OutputDto<T>} 이메일 성공 여부 리턴
   * @author in-ch, 2023-01-23
   */
  async sendEmail(params: SendEmailParams) {
    try {
      const { to, subject, html } = params;

      AWS.config.update({
        credentials: {
          accessKeyId: process.env.ROOT_ACCESS_KEY,
          secretAccessKey: process.env.ROOT_SECRET_KEY,
        },
        region: process.env.AWS_REGION,
      });

      const transporter = NODEMAILER.createTransport({
        SES: new AWS.SES({
          apiVersion: '2010-12-01',
        }),
      });

      transporter.sendMail(
        {
          from: process.env.EMAIL_FROM,
          to,
          subject,
          html,
        },
        (err) => {
          if (err) {
            console.error(err);
          }
        },
      );

      return {
        data: true,
        statusCode: 200,
      };
    } catch (e) {
      console.error(`SEND EMAIL ERROR ${e}`);
      throw e;
    }
  }
}
