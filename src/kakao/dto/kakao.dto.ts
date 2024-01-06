import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

import { UserCreateInputCrudDto } from 'src/user/dto/user.dto';

export class MeInputDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}

export class MeOkOutputDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  connected_at: string;

  @ApiProperty()
  @IsArray()
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };

  @ApiProperty()
  @IsArray()
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}

export class MeErrorOutputDto {
  @ApiProperty()
  @IsString()
  msg: string;

  @ApiProperty()
  @IsNumber()
  code: number;
}

export class RefreshInputDto {
  @ApiProperty()
  @IsString()
  refresh_token: string;
}

export class RefreshOkOutputDto {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  token_type: string;

  @ApiProperty()
  @IsString()
  refresh_token: string;

  @ApiProperty()
  @IsString()
  id_token: string;

  @ApiProperty()
  @IsNumber()
  expires_in: number;

  @ApiProperty()
  @IsNumber()
  refresh_token_expires_in: number;
}

export class LogoutInputDto extends MeInputDto {}
export class LogoutOutputDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class KakaoLoginInputDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}
export class KakaoLoginOutputDto extends UserCreateInputCrudDto {
  @ApiProperty()
  @IsString()
  token?: string;

  @ApiProperty()
  @IsString()
  refresh_token?: string;
}
