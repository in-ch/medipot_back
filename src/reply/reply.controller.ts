import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { ReplyCrudDto, ReplyHeaderDto } from './dto/reply.dto';
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
}
