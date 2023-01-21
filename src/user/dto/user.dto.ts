import { PickType } from '@nestjs/mapped-types';
import { IsBoolean, IsString } from 'class-validator';

export class UserCreateInputCrudDto {
  @IsString()
  nickname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  marketingConsent: boolean;
}

export class UserCreateOutputCrudDto extends UserCreateInputCrudDto {
  access_token?: string;
  refresh_token?: string;
}

export class UserLoginCrudDto extends PickType(UserCreateInputCrudDto, ['email', 'password']) {}
export class UserLoginOutputCrudDto extends UserCreateInputCrudDto {
  token?: string;
  refresh_token?: string;
}
