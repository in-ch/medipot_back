import { Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { ReplyCrudDto, ReplyHeaderDto, ReplyPaginationDto } from './dto/reply.dto';
import { Reply } from './entities/reply';
import { ReplyService } from './reply.service';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replysService: ReplyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  like(
    @Body() payload: ReplyCrudDto,
    @Headers() header: ReplyHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.replysService.create(payload, header);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getReplys(@Req() request: Request<ReplyPaginationDto>): Promise<OutputDto<Reply[]>> {
    return this.replysService.getReplys(request);
  }
}
