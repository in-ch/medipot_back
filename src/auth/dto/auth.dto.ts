import { IsString } from 'class-validator';

export class AuthEmailParams {
  @IsString()
  email: string;
}

export class AuthEmailOutput {
  message?: string;
}
