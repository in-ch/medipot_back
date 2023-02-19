import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Writing } from './entities/writing';
import { MeInputDto } from 'src/user/dto/user.dto';
import { WritingCreateDto, WritingCreateOutputDto } from './dto/writing.dto';
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
