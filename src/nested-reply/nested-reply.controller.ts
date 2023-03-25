import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { CreateNestedReplyHeaderParams, CreateNestedReplyParams } from './dto/nestedReply.dto';
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
}
