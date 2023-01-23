import { IsString } from 'class-validator';

export class SendEmailParams {
  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  html: string;
}
