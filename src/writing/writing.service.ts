import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, ILike, In, Repository } from 'typeorm';
import { Writing } from './entities/writing';
import { MeInputDto } from 'src/user/dto/user.dto';
import {
  WritingCreateDto,
  WritingCreateOutputDto,
  WritingDetailDto,
  WritingListDto,
} from './dto/writing.dto';
import { OutputDto } from 'src/commons/dtos';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entitiy';

@Injectable()
export class WritingService {
  constructor(
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param {WritingListDto} query tag, userNo, title, text, limit, page
   * @description 커뮤니티 글들을 가져온다.
   * @return {OutputDto<Writing[]>} 글 목록
   * @author in-ch, 2023-02-23
   */
  async getWritings(query: WritingListDto): Promise<OutputDto<Writing[]>> {
    const { tag, userNo, text, limit, page } = query;
    try {
      const writings = await this.writings.find({
        take: limit || 10,
        skip: page * limit || 0,
        where: {
          user: {
            no: userNo,
          },
          tags: tag !== '인기게시판' && tag ? ArrayContains([tag]) : ArrayContains([]),
          title: text ? ILike(`%${text}%`) : ILike(`%%`),
          text: text ? ILike(`%${text}%`) : ILike(`%%`),
        },
        relations: ['user', 'like', 'like.user', 'reply'],
        order: tag === '인기게시판' && {
          like: {
            no: 'DESC',
          },
        },
      });
      return {
        totalCount: writings.length,
        isDone: true,
        status: 200,
        data: writings.map((writing) => {
          delete writing.user.password;
          writing.reply.map((replyData, index) => {
            replyData.isDeleted && delete writing.reply[index];
            delete replyData.deletedAt;
            delete replyData.isDeleted;
          });
          return writing;
        }),
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }

  /**
   * @param {WritingListDto} query no
   * @description 커뮤니티 글을 하나 가져온다.
   * @return {OutputDto<Writing>} 커뮤니티 글
   * @author in-ch, 2023-02-26
   */
  async getWriting(query: WritingDetailDto): Promise<OutputDto<Writing>> {
    const { no } = query;
    try {
      const Writing = await this.writings.findOne({
        where: {
          no,
        },
        relations: ['user', 'like', 'like.user', 'reply'],
      });
      delete Writing.user.password;
      Writing.reply.map((replyData, index) => {
        replyData.isDeleted && delete Writing.reply[index];
        delete replyData.deletedAt;
        delete replyData.isDeleted;
      });
      return {
        isDone: true,
        status: 200,
        data: Writing,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }

  /**
   * @param {MeInputDto} header 헤더값
   * @param {WritingCreateDto} params  title, text, tags, imgs
   * @description 커뮤니티 글을 생성한다.
   * @return {OutputDto<WritingCreateOutputDto>} 생성된 글
   * @author in-ch, 2023-02-19
   */
  async create(
    header: MeInputDto,
    payload: WritingCreateDto,
  ): Promise<OutputDto<WritingCreateOutputDto>> {
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;

    try {
      const user = await this.users.findOne({
        where: {
          no,
        },
      });
      const Writing = await this.writings.save(this.writings.create({ ...payload, user }));
      this.writings.save(Writing);

      return {
        isDone: true,
        status: 200,
        data: Writing,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: e,
      };
    }
  }
}
