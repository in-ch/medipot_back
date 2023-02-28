import { Body, Headers, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Repository } from 'typeorm';
import { LikeCrudDto, LikeHeaderDto } from './dto/like';
import { Like } from './entities/like.entitiy';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likes: Repository<Like>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    private readonly jwtService: JwtService,
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
      });
      if (Like?.no) {
        return {
          isDone: false,
          status: 410,
          error: '이미 좋아요를 했습니다.',
          data: false,
        };
      } else {
        this.likes.save(
          this.likes.create({
            user: User,
            writing: Writing,
          }),
        );
        return {
          isDone: true,
          status: 200,
          data: true,
        };
      }
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: `오류가 발생하였습니다. ${e}`,
      };
    }
  }
}
