import { IsArray, IsNumber, IsString } from 'class-validator';

export class MeInputDto {
  @IsString()
  access_token: string;
}

export class MeOkOutputDto {
  @IsNumber()
  id: number;

  @IsString()
  connected_at: string;

  @IsArray()
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };

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
  @IsString()
  msg: string;

  @IsNumber()
  code: number;
}

export class RefreshInputDto {
  @IsString()
  refresh_token: string;
}

export class RefreshOkOutputDto {
  @IsString()
  access_token: string;

  @IsString()
  token_type: string;

  @IsString()
  refresh_token: string;

  @IsString()
  id_token: string;

  @IsNumber()
  expires_in: number;

  @IsNumber()
  refresh_token_expires_in: number;
}
