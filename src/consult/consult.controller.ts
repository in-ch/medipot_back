import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { ConsultService } from './consult.service';
import {
  DoneConsultParams,
  DoneConsultResponse,
  SendConsultAddHeaders,
  SendConsultAddParams,
  SendConsultAddResponse,
} from './dto/consult.dto';

@Controller('consult')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async sendConsultAdd(
    @Body() params: SendConsultAddParams,
    @Headers() header: SendConsultAddHeaders,
  ): Promise<OutputDto<SendConsultAddResponse>> {
    return this.consultService.sendConsultAdd(params, header);
  }

  /// 어드민 유저 가드 추가해야 함.
  @Post('/done')
  async doneConsult(@Body() params: DoneConsultParams): Promise<OutputDto<DoneConsultResponse>> {
    return this.consultService.doneConsult(params);
  }
}
