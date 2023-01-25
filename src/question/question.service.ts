import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutputDto } from 'src/commons/dtos';
import { Question } from './entities/question.entitiy';
import { QuestionCrudDto, QuestionOutputCrudDto } from './dto/question';
import { User } from 'src/user/entities/user.entitiy';
import { Location } from 'src/location/entities/location.entitiy';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private readonly questions: Repository<Question>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Location) private readonly locations: Repository<Location>,
  ) {}

  async addDetail(payload: QuestionCrudDto): Promise<OutputDto<QuestionOutputCrudDto>> {
    const { userNo, locationNo } = payload;

    try {
      const user = await this.users.findOne({
        where: {
          no: userNo,
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
        userNo,
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
}
