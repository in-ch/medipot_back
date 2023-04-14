import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { SendEmailParams } from './dto/email.dto';
import { EmailService } from './email.service';

@ApiTags('이메일')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiBody({ type: SendEmailParams })
  @ApiCreatedResponse({ description: '성공', type: null })
  @Post('/send')
  async sendEmail(@Body() params: SendEmailParams) {
    return this.emailService.sendEmail(params);
  }
}
