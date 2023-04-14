import { Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { ConsultService } from './consult.service';
import {
  ConsultListHeaders,
  ConsultListPagination,
  DoneConsultParams,
  DoneConsultResponse,
  SendConsultAddHeaders,
  SendConsultAddParams,
  SendConsultAddResponse,
} from './dto/consult.dto';
import { Consult } from './entities/consult.entitiy';

@ApiTags('상담 신청')
@Controller('consult')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @ApiBody({ type: SendConsultAddParams })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<SendConsultAddResponse> })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async sendConsultAdd(
    @Body() params: SendConsultAddParams,
    @Headers() header: SendConsultAddHeaders,
  ): Promise<OutputDto<SendConsultAddResponse>> {
    return this.consultService.sendConsultAdd(params, header);
  }

  @ApiBody({ type: ConsultListPagination })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<Consult[]> })
  @Get('/list')
  async list(
    @Req() request: Request<ConsultListPagination>,
    @Headers() header: ConsultListHeaders,
  ): Promise<OutputDto<Consult[]>> {
    return this.consultService.list(request.query, header);
  }

  @ApiBody({ type: DoneConsultParams })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<DoneConsultResponse> })
  /// 어드민 유저 가드 추가해야 함.
  @Post('/done')
  async doneConsult(@Body() params: DoneConsultParams): Promise<OutputDto<DoneConsultResponse>> {
    return this.consultService.doneConsult(params);
  }
}
