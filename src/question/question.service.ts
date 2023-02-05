import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutputDto } from 'src/commons/dtos';
import { Question } from './entities/question.entitiy';
import {
  QuestionCrudDto,
  QuestionHeaderDto,
  QuestionListPagination,
  QuestionOutputCrudDto,
} from './dto/question';
import { User } from 'src/user/entities/user.entitiy';
import { Location } from 'src/location/entities/location.entitiy';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private readonly questions: Repository<Question>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Location) private readonly locations: Repository<Location>,
    private readonly jwtService: JwtService,
  ) {}

  async addDetail(
    payload: QuestionCrudDto,
    header: QuestionHeaderDto,
  ): Promise<OutputDto<QuestionOutputCrudDto>> {
    const { locationNo } = payload;
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
      const location = await this.locations.findOne({
        where: {
          no: locationNo,
        },
      });
      const newQuestion = {
        user,
        location,
        userNo: no,
        locationNo,
      };
      this.questions.save(this.questions.create(newQuestion));

      return {
        isDone: true,
        status: 200,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: '오류가 발생하였습니다.',
      };
    }
  }

  async getQuestion(query: QuestionListPagination): Promise<OutputDto<Question[]>> {
    const { limit, page } = query;
    try {
      const questions = await this.questions.find({
        take: limit || 10,
        skip: page * limit || 0,
      });
      const totalCount = questions.length;

      questions.map((question) => {
        console.log(question?.user?.no);
      });
      return {
        totalCount,
        isDone: true,
        status: 200,
        data: questions,
      };
    } catch (e) {
      console.error(e);
      return {
        isDone: false,
        status: 400,
        error: '오류가 발생하였습니다.',
      };
    }
  }
}
