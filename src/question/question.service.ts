import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutputDto } from 'src/commons/dtos';
import { Question } from './entities/question.entitiy';
import { QuestionCrudDto, QuestionOutputCrudDto } from './dto/question';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question) private readonly questions: Repository<Question>) {}

  async addDetail(payload: QuestionCrudDto): Promise<OutputDto<QuestionOutputCrudDto>> {
    try {
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
