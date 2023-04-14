import { Body, Headers, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entitiy';
import { IsNull, Repository } from 'typeorm';

import {
  CreateNestedReplyHeaderParams,
  CreateNestedReplyParams,
  DeletedNestedReplyCrudDto,
  DeletedNestedReplyHeaderDto,
  NestedReplyListPagination,
} from './dto/nestedReply.dto';
import { NestedReply } from './entities/nestedReply.entitiy';

@Injectable()
export class NestedReplyService {
  constructor(
    @InjectRepository(NestedReply) private readonly nestedReplys: Repository<NestedReply>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Reply) private readonly replys: Repository<Reply>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param {CreateNestedReplyParams} request replyNo, comment
   * @param {CreateNestedReplyHeaderParams} header authorization
   * @description 대댓글을 생성한다.
   * @return {OutputDto<NestedReply>} 생성된 대댓글
   * @author in-ch, 2023-03-25
   */
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

  /**
   * @param {NestedReplyListPagination} request limit, page, replyNo
   * @description 대댓글 리스트를 가져온다.
   * @return {OutputDto<NestedReply[]>} 대댓글 리스트
   * @author in-ch, 2023-03-25
   */
  async getNestedReplys(
    @Req() request: Request<NestedReplyListPagination>,
  ): Promise<OutputDto<NestedReply[]>> {
    const {
      query: { limit, page, replyNo },
    } = request;

    try {
      const nestedReplys: NestedReply[] = await this.nestedReplys.find({
        take: Number(limit) || 10,
        skip: Number(page) * Number(limit) || 0,
        where: {
          reply: {
            no: Number(replyNo),
          },
          deletedAt: IsNull(),
        },
        relations: ['user'],
      });
      return {
        isDone: true,
        status: 200,
        data: nestedReplys,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: `getNestedReplys에서 오류가 발생하였습니다. ${e}`,
      };
    }
  }

  /**
   * @param {DeletedNestedReplyCrudDto} payload nestedReply: number
   * @param {DeletedNestedReplyCrudDto} header  authorization: string
   * @description 대댓글을 삭제한다
   * @return {OutputDto<NestedReply>} 대댓글 삭제 결과
   * @author in-ch, 2023-03-28
   */
  async deletedNestedReply(
    payload: DeletedNestedReplyCrudDto,
    header: DeletedNestedReplyHeaderDto,
  ): Promise<OutputDto<NestedReply>> {
    const { nestedReplyNo } = payload;
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;
    try {
      const NestedReply = await this.nestedReplys.findOne({
        where: {
          no: nestedReplyNo,
          deletedAt: IsNull(),
          user: {
            no,
          },
        },
      });

      await this.nestedReplys.softDelete({
        no: nestedReplyNo,
        deletedAt: IsNull(),
        user: {
          no,
        },
      });
      return {
        isDone: true,
        status: 200,
        data: NestedReply,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: `deletedNestedReply에서 오류가 발생하였습니다. ${e}`,
      };
    }
  }
}
