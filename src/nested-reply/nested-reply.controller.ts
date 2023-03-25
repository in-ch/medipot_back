import { Body, Controller, Post } from '@nestjs/common';
import { NestedReplyService } from './nested-reply.service';

@Controller('nestedReply')
export class NestedReplyController {
  constructor(private readonly nestedReplyService: NestedReplyService) {}
  // @Post('/send')
  // async sendEmail(@Body() params: SendEmailParams) {
  //   return this.emailService.sendEmail(params);
  // }
}
