import { Controller, Post, Headers, UseGuards, Body } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { MeInputDto } from 'src/user/dto/user.dto';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { WritingCreateDto, WritingCreateOutputDto } from './dto/writing.dto';
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
}
