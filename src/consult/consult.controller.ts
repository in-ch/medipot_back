import { Body, Controller, Post } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { ConsultService } from './consult.service';
import { SendConsultAddParams, SendConsultAddResponse } from './dto/consult.dto';

@Controller('consult')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}
  @Post('/add')
  async sendConsultAdd(
    @Body() params: SendConsultAddParams,
  ): Promise<OutputDto<SendConsultAddResponse>> {
    return this.consultService.sendConsultAdd(params);
  }
}
