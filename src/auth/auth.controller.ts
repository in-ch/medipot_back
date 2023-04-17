import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authsService: AuthService) {}

  @ApiBody({ type: AuthEmailParams })
  @ApiResponse({ description: '성공', type: OutputDto<AuthEmailOutput> })
  @Post('/email/send')
  async sendAuthEmail(@Body() payload: AuthEmailParams): Promise<OutputDto<AuthEmailOutput>> {
    return this.authsService.sendAuthEmail(payload);
  }

  @ApiBody({ type: EmailValidationParams })
  @ApiResponse({ description: '성공', type: OutputDto<EmailValidationOutput> })
  @Post('/email/validation')
  async emailValidation(
    @Body() payload: EmailValidationParams,
  ): Promise<OutputDto<EmailValidationOutput>> {
    return this.authsService.emailValidation(payload);
  }

  @ApiBody({ type: NicknameValidationParams })
  @ApiResponse({ description: '성공', type: OutputDto<NicknameValidationResponse> })
  @Post('/nickname/validation')
  async nicknameValidation(
    @Body() payload: NicknameValidationParams,
  ): Promise<OutputDto<NicknameValidationResponse>> {
    return this.authsService.nicknameValidation(payload);
  }
}
