import { Body, Controller, Post, Headers } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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

@ApiTags('Kakao')
@Controller('kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @ApiBody({})
  @ApiCreatedResponse({ description: '성공', type: OutputDto<MeOkOutputDto | MeErrorOutputDto> })
  @Post('/me')
  me(@Headers() header: MeInputDto): Promise<OutputDto<MeOkOutputDto | MeErrorOutputDto>> {
    return this.kakaoService.me(header);
  }

  @ApiBody({ type: RefreshInputDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<RefreshOkOutputDto> })
  @Post('/refresh')
  refresh(@Body() params: RefreshInputDto): Promise<OutputDto<RefreshOkOutputDto>> {
    return this.kakaoService.refresh(params);
  }

  @ApiBody({ type: LogoutInputDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<LogoutOutputDto> })
  @Post('/logout')
  logout(@Headers() header: LogoutInputDto): Promise<OutputDto<LogoutOutputDto>> {
    return this.kakaoService.logout(header);
  }

  @ApiBody({ type: KakaoLoginInputDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<KakaoLoginOutputDto> })
  @Post('/login')
  kakaoLogin(@Body() params: KakaoLoginInputDto): Promise<OutputDto<KakaoLoginOutputDto>> {
    return this.kakaoService.kakaoLogin(params);
  }
}
