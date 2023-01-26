import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { QuestionCrudDto, QuestionOutputCrudDto } from './dto/question';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/detail/add')
  addDetail(@Body() payload: QuestionCrudDto): Promise<OutputDto<QuestionOutputCrudDto>> {
    return this.questionService.addDetail(payload);
  }
}
