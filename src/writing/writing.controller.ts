import { Controller, Post, Headers, UseGuards, Body, Get, Req } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OutputDto, PageOutput } from 'src/commons/dtos';
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

@ApiTags('커뮤니티 글')
@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @ApiBody({ type: WritingCreateDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<WritingCreateOutputDto> })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  create(
    @Headers() header: MeInputDto,
    @Body() payload: WritingCreateDto,
  ): Promise<OutputDto<WritingCreateOutputDto>> {
    return this.writingService.addWriting(header, payload);
  }

  @ApiBody({ type: WritingListDto })
  @ApiResponse({ description: '성공', type: OutputDto<Writing> })
  @UseGuards(JwtAuthGuard)
  @Get('/list')
  getWritings(@Req() request: Request<WritingListDto>): Promise<OutputDto<PageOutput<Writing[]>>> {
    return this.writingService.getWritings(request.query);
  }

  @ApiBody({ type: WritingDetailDto })
  @ApiResponse({ description: '성공', type: OutputDto<Writing> })
  @UseGuards(JwtAuthGuard)
  @Get('/detail')
  getWriting(@Req() request: Request<WritingDetailDto>): Promise<OutputDto<Writing>> {
    return this.writingService.getWriting(request.query);
  }
}
