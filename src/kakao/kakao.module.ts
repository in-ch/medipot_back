import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KakaoController } from './kakao.controller';
import { KakaoService } from './kakao.service';

@Module({
  imports: [HttpModule],
  controllers: [KakaoController],
  providers: [KakaoService],
})
export class KakaoModule {}
