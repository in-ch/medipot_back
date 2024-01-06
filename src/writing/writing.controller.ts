import { Controller, Post, Headers, UseGuards, Body, Get, Req, Delete } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OutputDto, PageOutput } from 'src/commons/dtos';
import { MeInputDto } from 'src/user/dto/user.dto';
import { GrantGuard } from 'src/user/strategy/grant.strategy';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { Writing } from './entities/writing';
import { WritingService } from './writing.service';
import {
  WritingCreateDto,
  WritingCreateOutputDto,
  WritingDeleteDto,
  WritingDetailDto,
  WritingListDto,
} from './dto/writing.dto';

@ApiTags('커뮤니티 글')
@Controller('writing')
@UseGuards(GrantGuard, JwtAuthGuard)
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @ApiBody({ type: WritingCreateDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<WritingCreateOutputDto> })
  @Post('/add')
  create(
    @Headers() header: MeInputDto,
    @Body() payload: WritingCreateDto,
  ): Promise<OutputDto<WritingCreateOutputDto>> {
    return this.writingService.addWriting(header, payload);
  }

  @ApiBody({ type: WritingListDto })
  @ApiResponse({ description: '성공', type: OutputDto<Writing> })
  @Get('/list')
  getWritings(@Req() request: Request<WritingListDto>): Promise<OutputDto<PageOutput<Writing[]>>> {
    return this.writingService.getWritings(request.query);
  }

  @ApiBody({ type: WritingDetailDto })
  @ApiResponse({ description: '성공', type: OutputDto<Writing> })
  @Get('/detail')
  getWriting(@Req() request: Request<WritingDetailDto>): Promise<OutputDto<Writing>> {
    return this.writingService.getWriting(request.query);
  }

  @ApiBody({ type: WritingDeleteDto })
  @ApiResponse({ description: '성공', type: OutputDto<WritingDeleteDto> })
  @Delete('/delete')
  deleteWriting(
    @Headers() header: MeInputDto,
    @Body() payload: WritingDeleteDto,
  ): Promise<OutputDto<Writing>> {
    return this.writingService.deleteWriting(header, payload);
  }
}
