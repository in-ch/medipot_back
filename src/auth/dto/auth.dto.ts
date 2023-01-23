import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class AuthEmailParams {
  @IsString()
  email: string;
}

export class AuthEmailOutput {
  message?: string;
}

export class EmailValidationParams extends PickType(AuthEmailParams, ['email']) {
  @IsString()
  code: string;
}

export class EmailValidationOutput extends AuthEmailOutput {}
