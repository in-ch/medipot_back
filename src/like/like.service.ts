import { Body, ConflictException, Headers, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlarmService } from 'src/alarm/alarm.service';
import { ALARM_TYPE } from 'src/alarm/entities/alarm.entitiy';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { LikeCrudDto, LikeHeaderDto, UnlikeCrudDto, UnlikeHeaderDto } from './dto/like';
import { Like } from './entities/like.entitiy';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likes: Repository<Like>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    private readonly jwtService: JwtService,
    private readonly alarmService: AlarmService,
  ) {}

  async like(
    @Body() payload: LikeCrudDto,
    @Headers() header: LikeHeaderDto,
  ): Promise<OutputDto<boolean>> {
    const { writingNo } = payload;
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;

    try {
      const Like = await this.likes.findOne({
        where: {
          user: {
            no,
          },
          writing: {
            no: writingNo,
          },
        },
        relations: ['user', 'writing'],
        loadRelationIds: true,
      });
      if (Like?.no) {
        throw new ConflictException(
          `이미 좋아요를 했습니다. 유저 no: ${no} 게시글 no: ${writingNo}`,
        );
      } else {
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

        await this.likes.save(
          this.likes.create({
            user: User,
            writing: Writing,
          }),
        );

        // 알림 추가
        if (no !== Writing.user.no)
          await this.alarmService.addAlarm({
            userNo: Writing.user.no,
            type: ALARM_TYPE.like,
          });

        return {
          statusCode: 200,
          data: true,
        };
      }
    } catch (e) {
      console.error(`좋아요 api 오류: ${e}`);
      throw e;
    }
  }

  async unlike(
    @Body() payload: UnlikeCrudDto,
    @Headers() header: UnlikeHeaderDto,
  ): Promise<OutputDto<boolean>> {
    const { writingNo } = payload;
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;

    try {
      const Like = await this.likes.findOne({
        where: {
          user: {
            no,
          },
          writing: {
            no: writingNo,
          },
        },
        relations: ['user', 'writing'],
        loadRelationIds: true,
      });
      if (!Like?.no) {
        throw new ConflictException(
          `이미 삭제한 좋아요입니다. 유저 no: ${no} 게시글 no: ${writingNo}`,
        );
      } else {
        this.likes.delete(Like.no);
        return {
          statusCode: 200,
          data: true,
        };
      }
    } catch (e) {
      console.error(`unlike api error: ${e}`);
      throw e;
    }
  }
}
