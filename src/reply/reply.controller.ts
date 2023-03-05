import { Body, Controller, Delete, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import {
  ReplyCrudDto,
  ReplyDeleteDto,
  ReplyHeaderDto,
  ReplyPaginationDto,
  TotalCountDto,
} from './dto/reply.dto';
import { Reply } from './entities/reply';
import { ReplyService } from './reply.service';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replysService: ReplyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getReplys(@Req() request: Request<ReplyPaginationDto>): Promise<OutputDto<Reply[]>> {
    return this.replysService.getReplys(request);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  like(
    @Body() payload: ReplyCrudDto,
    @Headers() header: ReplyHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.replysService.create(payload, header);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  replyDelete(
    @Body() payload: ReplyDeleteDto,
    @Headers() header: ReplyHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.replysService.delete(payload, header);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/total')
  totalCount(@Req() request: Request<TotalCountDto>): Promise<OutputDto<number>> {
    return this.replysService.totalCount(request);
  }
}
