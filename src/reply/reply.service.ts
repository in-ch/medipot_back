import { Body, Headers, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Repository } from 'typeorm';
import { ReplyCrudDto, ReplyHeaderDto, ReplyPaginationDto } from './dto/reply.dto';
import { Reply } from './entities/reply';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    @InjectRepository(Reply) private readonly replys: Repository<Reply>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param {Request<ReplyCrudDto>} payload writingNo, comment
   * @description 댓글을 등록한다.
   * @return {OutputDto<Reply[]>} 댓글 정보들을 가져온다.
   * @author in-ch, 2023-03-04
   */
  async create(
    @Body() payload: ReplyCrudDto,
    @Headers() header: ReplyHeaderDto,
  ): Promise<OutputDto<boolean>> {
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
      });
      this.replys.save(
        this.replys.create({
          user: User,
          writing: Writing,
          comment,
        }),
      );
      return {
        isDone: true,
        status: 200,
        data: true,
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
   * @param {Request<ReplyPaginationDto>} query 쿼리값
   * @description writing no에 따른 댓글 리스트를 가져온다.
   * @return {OutputDto<Reply[]>}
   * @author in-ch, 2023-03-04
   */
  async getReplys(request: Request<ReplyPaginationDto>): Promise<OutputDto<Reply[]>> {
    const {
      query: { writingNo, limit, page },
    } = request;
    console.log(request);
    try {
      const replys = await this.replys.find({
        take: Number(limit) || 10,
        skip: Number(page) * Number(limit) || 0,
        where: {
          writing: {
            no: Number(writingNo),
          },
        },
      });
      const totalCount = replys.length;
      return {
        totalCount,
        isDone: true,
        status: 200,
        data: replys,
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