import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NestedReply } from './entities/nestedReply.entitiy';
import { NestedReplyController } from './nested-reply.controller';
import { NestedReplyService } from './nested-reply.service';

@Module({
  imports: [TypeOrmModule.forFeature([NestedReply])],
  controllers: [NestedReplyController],
  providers: [NestedReplyService],
})
export class NestedReplyModule {}
