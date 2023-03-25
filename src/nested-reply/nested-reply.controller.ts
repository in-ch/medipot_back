import { Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import {
  CreateNestedReplyHeaderParams,
  CreateNestedReplyParams,
  NestedHeaderDto,
  NestedReplyListPagination,
} from './dto/nestedReply.dto';
import { NestedReply } from './entities/nestedReply.entitiy';
import { NestedReplyService } from './nested-reply.service';

@Controller('nestedReply')
export class NestedReplyController {
  constructor(private readonly nestedReplyService: NestedReplyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addNestedReply(
    @Body() params: CreateNestedReplyParams,
    @Headers() header: CreateNestedReplyHeaderParams,
  ): Promise<OutputDto<NestedReply>> {
    return this.nestedReplyService.addNestedReply(params, header);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getNestedReplys(
    @Req() request: Request<NestedReplyListPagination>,
  ): Promise<OutputDto<NestedReply[]>> {
    return this.nestedReplyService.getNestedReplys(request);
  }
}
