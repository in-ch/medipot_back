import { Body, Controller, Post } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { AuthService } from './auth.service';
import { AuthEmailOutput, AuthEmailParams } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authsService: AuthService) {}

  @Post('/email/send')
  async sendAuthEmail(@Body() payload: AuthEmailParams): Promise<OutputDto<AuthEmailOutput>> {
    return this.authsService.sendAuthEmail(payload);
  }
}
