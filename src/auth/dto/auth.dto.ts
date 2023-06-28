import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthEmailParams {
  @ApiProperty()
  @IsString()
  email: string;
}

export class AuthEmailOutput {
  @ApiProperty()
  @IsString()
  message?: string;
}

export class EmailValidationParams extends PickType(AuthEmailParams, ['email']) {
  @ApiProperty()
  @IsString()
  code: string;
}

export class NicknameValidationParams {
  @ApiProperty()
  @IsString()
  nickname: string;
}

export class ValidationPhoneParams {
  @ApiProperty()
  @IsString()
  code: string;
}

export class ValidationPhoneHeader {
  @ApiProperty()
  @IsString()
  authorization: string;
}

export class SendPhoneValidationParams {
  @ApiProperty()
  @IsString()
  phone: string;
}
export class sendPhoneValidationHeader extends ValidationPhoneHeader {}

export class NicknameValidationResponse {}

export class EmailValidationOutput extends AuthEmailOutput {}
