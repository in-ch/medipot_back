import { Body, Headers, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { IsNull, Repository } from 'typeorm';

import { AlarmService } from 'src/alarm/alarm.service';
import { ALARM_TYPE } from 'src/alarm/entities/alarm.entitiy';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Reply } from './entities/reply.entity';
import {
  ReplyCrudDto,
  ReplyDeleteDto,
  ReplyHeaderDto,
  ReplyPaginationDto,
  TotalCountDto,
} from './dto/reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    @InjectRepository(Reply) private readonly replys: Repository<Reply>,
    @InjectRepository(NestedReply) private readonly nestedReplys: Repository<NestedReply>,

    private readonly jwtService: JwtService,
    private readonly alarmService: AlarmService,
  ) {}

  /**
   * @param {Request<ReplyPaginationDto>} query 쿼리값
   * @description writing no에 따른 댓글 리스트를 가져온다.
   * @return {OutputDto<Reply[]>}
   * @author in-ch, 2023-03-04
   */
  async getReplys(request: Request<ReplyPaginationDto>): Promise<OutputDto<PageOutput<Reply[]>>> {
    const {
      query: { writingNo, limit, page },
    } = request;
    try {
      const replys = await this.replys.find({
        take: Number(limit) || 10,
        skip: Number(page) * Number(limit) || 0,
        where: {
          writing: {
            no: Number(writingNo),
          },
          deletedAt: IsNull(),
        },
        relations: ['user'],
      });
      const totalCount = replys.length;

      for (let reply of replys) {
        const nested_reply_count = await this.nestedReplys.count({
          where: {
            reply: {
              no: reply.no,
            },
          },
        });
        reply.totalCount = nested_reply_count;
      }

      return {
        totalCount,
        statusCode: 200,
        data: {
          page: Number(page),
          list: replys,
        },
      };
    } catch (e) {
      console.error(`getReplys API Error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {Request<ReplyPaginationDto>} query 쿼리값
   * @param {ReplyHeaderDto} header header값
   * @description user가 댓글을 쓴 글 목록을 가져온다.
   * @return {OutputDto<Writing[]>}
   * @author in-ch, 2023-05-11
   */
  async getReplysWritings(@Headers() header: ReplyHeaderDto): Promise<OutputDto<Writing[]>> {
    try {
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;
      const REPLYS = await this.replys
        .createQueryBuilder('reply')
        .select('DISTINCT reply.writing_id', 'writing_id')
        .leftJoin('reply.user', 'user')
        .where('user.no = :userNo', { userNo: no })
        .getRawMany();

      const writingIds = REPLYS.map((item) => item.writing_id);

      const writings = await this.writings
        .createQueryBuilder('writing')
        .leftJoinAndSelect('writing.user', 'user')
        .leftJoinAndSelect('writing.reply', 'reply')
        .leftJoinAndSelect('writing.like', 'like')
        .leftJoinAndSelect('like.user', 'likeUser') // 추가: like 테이블과 user 테이블 조인
        .where('writing.no IN (:...writingIds)', { writingIds })
        .select(['writing', 'user', 'reply', 'like', 'likeUser.no']) // likeUser.no 추가: user 테이블의 no 값 선택
        .getMany();

      return {
        statusCode: 200,
        data: writings,
        totalCount: writings.length,
      };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @param {Request<ReplyCrudDto>} payload writingNo, comment
   * @description 댓글을 등록한다.
   * @return {OutputDto<Reply[]>} 댓글 정보들을 가져온다.
   * @author in-ch, 2023-03-04
   */
  async create(
    @Body() payload: ReplyCrudDto,
    @Headers() header: ReplyHeaderDto,
  ): Promise<OutputDto<Reply>> {
    try {
      const { writingNo, comment } = payload;
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;

      const User = await this.users.findOne({
        where: {
          no,
        },
      });
      const Writing = await this.writings.findOne({
        where: {
          no: writingNo,
        },
        relations: ['user'],
        loadRelationIds: true,
      });
      const NewWriting = await this.replys.save(
        this.replys.create({
          user: User,
          writing: Writing,
          comment,
        }),
      );

      // 알림 추가
      if (no !== Writing.user.no)
        this.alarmService.addAlarm({
          userNo: Writing.user.no,
          type: ALARM_TYPE.comment,
        });
      return {
        statusCode: 200,
        data: NewWriting,
      };
    } catch (e) {
      console.error(`댓글 생성 API Error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {ReplyDeleteDto} payload replyNo
   * @description 댓글을 삭제한다.
   * @return {Reply}
   * @author in-ch, 2023-03-04
   */
  async delete(
    @Body() request: Request<ReplyDeleteDto>,
    @Headers() header: ReplyHeaderDto,
  ): Promise<OutputDto<Reply>> {
    try {
      const {
        query: { replyNo },
      } = request;
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;

      const Reply = await this.replys.findOne({
        where: {
          no: Number(replyNo),
          user: {
            no,
          },
        },
      });

      await this.replys.softDelete({
        no: Number(replyNo),
        user: {
          no,
        },
      });
      return {
        statusCode: 200,
        data: Reply,
      };
    } catch (e) {
      console.error(`댓글 삭제 API Error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {TotalCountDto} payload writingNo
   * @description 댓글의 갯수를 구한다.
   * @return {number}
   * @author in-ch, 2023-03-04
   */
  async totalCount(@Req() request: Request<TotalCountDto>): Promise<OutputDto<number>> {
    try {
      const {
        query: { writingNo },
      } = request;
      const replys = await this.replys.count({
        where: {
          writing: {
            no: Number(writingNo),
          },
          deletedAt: IsNull(),
        },
      });
      return {
        statusCode: 200,
        data: replys,
      };
    } catch (e) {
      console.error(`totalCound API Error: ${e}`);
    }
  }
}
