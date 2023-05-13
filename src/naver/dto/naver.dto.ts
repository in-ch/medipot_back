import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MePayloadDto {
  @ApiProperty()
  @IsString()
  accessToken: string;
}

export class MeOkOutputDto {
  @ApiProperty()
  @IsNumber()
  userNo: number;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  profile: string;

  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  refresh_token: string;
}
