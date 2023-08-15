import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OutputDto } from 'src/commons/dtos';
import { EventCrudDto, EventListPagination } from './dto/event.dto';
import { Event } from './entities/event.entitiy';
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

  @ApiBody({ type: EventCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<Event> })
  // @UseGuards(AdminGuard)
  @Post()
  createEvent(@Body() payload: EventCrudDto): Promise<OutputDto<Event>> {
    return this.eventService.createEvent(payload);
  }
}
