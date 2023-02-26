import { Controller, Post, Headers, UseGuards, Body, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { MeInputDto } from 'src/user/dto/user.dto';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import {
  WritingCreateDto,
  WritingCreateOutputDto,
  WritingDetailDto,
  WritingListDto,
} from './dto/writing.dto';
import { Writing } from './entities/writing';
import { WritingService } from './writing.service';

@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  create(
    @Headers() header: MeInputDto,
    @Body() payload: WritingCreateDto,
  ): Promise<OutputDto<WritingCreateOutputDto>> {
    return this.writingService.create(header, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  getWritings(@Req() request: Request<WritingListDto>): Promise<OutputDto<Writing[]>> {
    return this.writingService.getWritings(request.query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/detail')
  getWriting(@Body() payload: WritingDetailDto): Promise<OutputDto<Writing>> {
    return this.writingService.getWriting(payload);
  }
}
