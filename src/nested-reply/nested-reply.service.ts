import { Body, Headers, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';

import { CreateNestedReplyHeaderParams, CreateNestedReplyParams } from './dto/nestedReply.dto';
import { NestedReply } from './entities/nestedReply.entitiy';

@Injectable()
export class NestedReplyService {
  constructor(
    @InjectRepository(NestedReply) private readonly nestedReplys: Repository<NestedReply>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Reply) private readonly replys: Repository<Reply>,
    private readonly jwtService: JwtService,
  ) {}

  async addNestedReply(
    @Body() params: CreateNestedReplyParams,
    @Headers() header: CreateNestedReplyHeaderParams,
  ): Promise<OutputDto<NestedReply>> {
    const { comment, replyNo } = params;
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;

    try {
      const User = await this.users.findOne({
        where: {
          no,
        },
      });
      const Reply = await this.replys.findOne({
        where: {
          no: replyNo,
        },
      });
      const NestedReply = await this.nestedReplys.save(
        this.nestedReplys.create({
          user: User,
          reply: Reply,
          comment,
        }),
      );
      return {
        isDone: true,
        status: 200,
        data: NestedReply,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: `오류가 발생하였습니다. ${e}`,
      };
    }
  }
}
