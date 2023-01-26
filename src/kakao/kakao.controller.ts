import { Body, Controller, Post, Headers } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import {
  MeInputDto,
  MeErrorOutputDto,
  MeOkOutputDto,
  RefreshInputDto,
  RefreshOkOutputDto,
  LogoutInputDto,
  LogoutOutputDto,
  KakaoLoginInputDto,
  KakaoLoginOutputDto,
} from './dto/kakao.dto';
import { KakaoService } from './kakao.service';

@Controller('kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Post('/me')
  me(@Headers() header: MeInputDto): Promise<OutputDto<MeOkOutputDto | MeErrorOutputDto>> {
    return this.kakaoService.me(header);
  }

  @Post('/refresh')
  refresh(@Body() params: RefreshInputDto): Promise<OutputDto<RefreshOkOutputDto>> {
    return this.kakaoService.refresh(params);
  }

  @Post('/logout')
  logout(@Headers() header: LogoutInputDto): Promise<OutputDto<LogoutOutputDto>> {
    return this.kakaoService.logout(header);
  }

  @Post('/login')
  kakaoLogin(@Body() params: KakaoLoginInputDto): Promise<OutputDto<KakaoLoginOutputDto>> {
    return this.kakaoService.kakaoLogin(params);
  }
}
