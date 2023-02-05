import { Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import {
  QuestionCrudDto,
  QuestionHeaderDto,
  QuestionListPagination,
  QuestionOutputCrudDto,
} from './dto/question';
import { Question } from './entities/question.entitiy';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/detail/add')
  addDetail(
    @Body() payload: QuestionCrudDto,
    @Headers() header: QuestionHeaderDto,
  ): Promise<OutputDto<QuestionOutputCrudDto>> {
    return this.questionService.addDetail(payload, header);
  }

  @Get('/list')
  getQuestion(@Req() request: Request<QuestionListPagination>): Promise<OutputDto<Question[]>> {
    return this.questionService.getQuestion(request.query);
  }
}
