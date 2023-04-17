import { Body, Controller, Delete, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import {
  CreateNestedReplyHeaderParams,
  CreateNestedReplyParams,
  DeletedNestedReplyCrudDto,
  DeletedNestedReplyHeaderDto,
  NestedReplyListPagination,
} from './dto/nestedReply.dto';
import { NestedReply } from './entities/nestedReply.entitiy';
import { NestedReplyService } from './nested-reply.service';

@ApiTags('대댓글')
@Controller('nestedReply')
export class NestedReplyController {
  constructor(private readonly nestedReplyService: NestedReplyService) {}

  @ApiBody({ type: CreateNestedReplyParams })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<NestedReply> })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addNestedReply(
    @Body() params: CreateNestedReplyParams,
    @Headers() header: CreateNestedReplyHeaderParams,
  ): Promise<OutputDto<NestedReply>> {
    return this.nestedReplyService.addNestedReply(params, header);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiBody({ type: NestedReplyListPagination })
  @ApiResponse({ description: '성공', type: OutputDto<NestedReply[]> })
  @Get('/list')
  async getNestedReplys(
    @Req() request: Request<NestedReplyListPagination>,
  ): Promise<OutputDto<NestedReply[]>> {
    return this.nestedReplyService.getNestedReplys(request);
  }

  @ApiBody({ type: NestedReplyListPagination })
  @ApiResponse({ description: '성공', type: OutputDto<NestedReply> })
  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deleteNestedReply(
    @Body() payload: DeletedNestedReplyCrudDto,
    @Headers() header: DeletedNestedReplyHeaderDto,
  ): Promise<OutputDto<NestedReply>> {
    return this.nestedReplyService.deletedNestedReply(payload, header);
  }
}
