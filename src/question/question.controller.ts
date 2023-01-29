import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { QuestionCrudDto, QuestionHeaderDto, QuestionOutputCrudDto } from './dto/question';
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
}
