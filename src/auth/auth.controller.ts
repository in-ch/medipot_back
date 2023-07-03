import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { AuthService } from './auth.service';
import {
  AuthEmailOutput,
  AuthEmailParams,
  EmailValidationOutput,
  EmailValidationParams,
  NicknameValidationParams,
  NicknameValidationResponse,
  sendPhoneValidationHeader,
  SendPhoneValidationParams,
  ValidationPhoneHeader,
  ValidationPhoneParams,
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

  @ApiBody({ type: SendPhoneValidationParams })
  @ApiResponse({ description: '성공', type: OutputDto<{ ok: boolean }> })
  @Post('/phone/validation/send')
  async sendPhoneValidation(
    @Body() payload: SendPhoneValidationParams,
    @Headers() header: sendPhoneValidationHeader,
  ): Promise<OutputDto<{ ok: boolean }>> {
    return this.authsService.sendPhoneValidation(payload, header);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ValidationPhoneParams })
  @ApiResponse({ description: '성공', type: OutputDto<{ ok: boolean }> })
  @Post('/phone/validation')
  async phoneValidation(
    @Body() payload: ValidationPhoneParams,
    @Headers() header: ValidationPhoneHeader,
  ): Promise<OutputDto<{ ok: boolean }>> {
    return this.authsService.phoneValidation(payload, header);
  }
}
