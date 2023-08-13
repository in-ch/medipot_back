import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { EventListPagination } from './dto/event.dto';

import { EventService } from './event.service';

@ApiTags('이벤트')
@Controller('event')
@UseGuards()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiBody({ type: EventListPagination })
  @ApiResponse({ description: '성공', type: OutputDto<Event[]> })
  @Get('/list')
  async list(@Req() request: Request<EventListPagination>) {
    return this.eventService.list(request.query);
  }
}
