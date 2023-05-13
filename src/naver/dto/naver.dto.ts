import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { KakaoLoginOutputDto } from 'src/kakao/dto/kakao.dto';

export class MePayloadDto {
  @ApiProperty()
  @IsString()
  accessToken: string;
}

export class NaverLoginOutputDto extends KakaoLoginOutputDto {}
