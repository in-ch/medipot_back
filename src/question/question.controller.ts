import { Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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

@ApiTags('문의')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiBody({ type: QuestionCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<QuestionOutputCrudDto> })
  @UseGuards(JwtAuthGuard)
  @Post('/detail/add')
  addDetail(
    @Body() payload: QuestionCrudDto,
    @Headers() header: QuestionHeaderDto,
  ): Promise<OutputDto<QuestionOutputCrudDto>> {
    return this.questionService.addDetail(payload, header);
  }

  @ApiBody({ type: QuestionListPagination })
  @ApiResponse({ description: '성공', type: OutputDto<Question[]> })
  @UseGuards(JwtAuthGuard)
  @Get('/list')
  getQuestion(
    @Req() request: Request<QuestionListPagination>,
    @Headers() header: QuestionHeaderDto,
  ): Promise<OutputDto<Question[]>> {
    return this.questionService.getQuestions(request.query, header);
  }
}
