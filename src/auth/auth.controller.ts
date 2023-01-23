import { Body, Controller, Post } from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos';
import { AuthService } from './auth.service';
import {
  AuthEmailOutput,
  AuthEmailParams,
  EmailValidationOutput,
  EmailValidationParams,
  NicknameValidationParams,
  NicknameValidationResponse,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authsService: AuthService) {}

  @Post('/email/send')
  async sendAuthEmail(@Body() payload: AuthEmailParams): Promise<OutputDto<AuthEmailOutput>> {
    return this.authsService.sendAuthEmail(payload);
  }

  @Post('/email/validation')
  async emailValidation(
    @Body() payload: EmailValidationParams,
  ): Promise<OutputDto<EmailValidationOutput>> {
    return this.authsService.emailValidation(payload);
  }

  @Post('/nickname/validation')
  async nicknameValidation(
    @Body() payload: NicknameValidationParams,
  ): Promise<OutputDto<NicknameValidationResponse>> {
    return this.authsService.nicknameValidation(payload);
  }
}
