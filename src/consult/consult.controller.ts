import { Body, Controller, Post } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { ConsultService } from './consult.service';
import {
  DoneConsultParams,
  DoneConsultResponse,
  SendConsultAddParams,
  SendConsultAddResponse,
} from './dto/consult.dto';

@Controller('consult')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}
  @Post('/add')
  async sendConsultAdd(
    @Body() params: SendConsultAddParams,
  ): Promise<OutputDto<SendConsultAddResponse>> {
    return this.consultService.sendConsultAdd(params);
  }

  /// 어드민 유저 가드 추가해야 함.
  @Post('/done')
  async doneConsult(@Body() params: DoneConsultParams): Promise<OutputDto<DoneConsultResponse>> {
    return this.consultService.doneConsult(params);
  }
}
