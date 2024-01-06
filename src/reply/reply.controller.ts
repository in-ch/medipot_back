import { Body, Controller, Delete, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OutputDto, PageOutput } from 'src/commons/dtos';
import { GrantGuard } from 'src/user/strategy/grant.strategy';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { Writing } from 'src/writing/entities/writing';
import { ReplyService } from './reply.service';
import { Reply } from './entities/reply.entity';
import {
  ReplyCrudDto,
  ReplyDeleteDto,
  ReplyHeaderDto,
  ReplyPaginationDto,
  TotalCountDto,
} from './dto/reply.dto';

@ApiTags('댓글')
@Controller('reply')
@UseGuards(GrantGuard)
export class ReplyController {
  constructor(private readonly replysService: ReplyService) {}

  // @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ReplyPaginationDto })
  @ApiResponse({ description: '성공', type: OutputDto<Reply[]> })
  @Get('')
  getReplys(@Req() request: Request<ReplyPaginationDto>): Promise<OutputDto<PageOutput<Reply[]>>> {
    return this.replysService.getReplys(request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ description: '성공', type: OutputDto<Writing[]> })
  @Get('/writings')
  getReplysWritings(@Headers() header: ReplyHeaderDto): Promise<OutputDto<Writing[]>> {
    return this.replysService.getReplysWritings(header);
  }

  @ApiBody({ type: ReplyCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<Reply> })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  like(
    @Body() payload: ReplyCrudDto,
    @Headers() header: ReplyHeaderDto,
  ): Promise<OutputDto<Reply>> {
    return this.replysService.create(payload, header);
  }

  @ApiBody({ type: ReplyDeleteDto })
  @ApiResponse({ description: '성공', type: OutputDto<Reply> })
  @UseGuards(JwtAuthGuard)
  @Delete('')
  replyDelete(
    @Req() request: Request<ReplyDeleteDto>,
    @Headers() header: ReplyHeaderDto,
  ): Promise<OutputDto<Reply>> {
    return this.replysService.delete(request, header);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiBody({ type: TotalCountDto })
  @ApiResponse({ description: '성공', type: OutputDto<number> })
  @Get('/total')
  totalCount(@Req() request: Request<TotalCountDto>): Promise<OutputDto<number>> {
    return this.replysService.totalCount(request);
  }
}
