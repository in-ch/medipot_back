import { Controller } from '@nestjs/common';
import { ConsultService } from './consult.service';

@Controller('consult')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}
  // @Post('/send')
  // async sendEmail(@Body() params: SendEmailParams) {
  //   return this.emailService.sendEmail(params);
  // }
}
