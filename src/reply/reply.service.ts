import { Body, Headers, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Repository } from 'typeorm';
import { ReplyCrudDto, ReplyHeaderDto } from './dto/reply.dto';
import { Reply } from './entities/reply';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    @InjectRepository(Reply) private readonly replys: Repository<Reply>,
    private readonly jwtService: JwtService,
  ) {}

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
}
