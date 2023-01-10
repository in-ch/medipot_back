import { Body, Controller, Post } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { MeInputDto, MeErrorOutputDto, MeOkOutputDto } from './dto/kakao.dto';
import { KakaoService } from './kakao.service';

@Controller('kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Post('/me')
  me(@Body() params: MeInputDto): Promise<OutputDto<MeOkOutputDto | MeErrorOutputDto>> {
    return this.kakaoService.me(params);
  }
}
