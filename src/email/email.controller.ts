import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailParams } from './dto/email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('/send')
  async sendEmail(@Body() params: SendEmailParams) {
    return this.emailService.sendEmail(params);
  }
}