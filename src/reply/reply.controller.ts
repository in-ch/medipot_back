import { Body, Controller, Delete, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { Reply } from './entities/reply.entity';
import { ReplyService } from './reply.service';

@ApiTags('댓글')
@Controller('reply')
export class ReplyController {
  constructor(private readonly replysService: ReplyService) {}

  // @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ReplyPaginationDto })
  @ApiResponse({ description: '성공', type: OutputDto<Reply[]> })
  @Get('')
  getReplys(@Req() request: Request<ReplyPaginationDto>): Promise<OutputDto<Reply[]>> {
    return this.replysService.getReplys(request);
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
