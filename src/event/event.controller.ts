import { Body, Controller, Delete, Get, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OutputDto } from 'src/commons/dtos';
import {
  ActiveEventDto,
  DeleteEventDto,
  EventCrudDto,
  EventListPagination,
  EventUpdateDto,
  GetEventDto,
} from './dto/event.dto';
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
    return this.eventService.list(request);
  }

  @ApiBody({ type: EventListPagination })
  @ApiResponse({ description: '성공', type: OutputDto<Event[]> })
  @Get('/list/all')
  async listAll(@Req() request: Request<EventListPagination>) {
    return this.eventService.listAll(request);
  }

  @ApiBody({ type: GetEventDto })
  @ApiResponse({ description: '성공', type: OutputDto<Event> })
  @Get()
  async getEvent(@Req() request: Request<GetEventDto>): Promise<OutputDto<Event>> {
    return this.eventService.getEvent(request);
  }

  @ApiBody({ type: EventCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<Event> })
  @Post()
  createEvent(@Body() payload: EventCrudDto): Promise<OutputDto<Event>> {
    return this.eventService.createEvent(payload);
  }

  @ApiBody({ type: EventCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<Event> })
  @Put()
  updateEvent(@Body() payload: EventUpdateDto): Promise<OutputDto<Event>> {
    return this.eventService.updateEvent(payload);
  }

  @ApiBody({ type: ActiveEventDto })
  @ApiResponse({ description: '성공', type: OutputDto<Event> })
  @Patch()
  activeEvent(@Body() payload: ActiveEventDto): Promise<OutputDto<Event>> {
    return this.eventService.activeEvent(payload);
  }

  @ApiBody({ type: DeleteEventDto })
  @ApiResponse({ description: '성공', type: OutputDto<Event> })
  @Delete()
  deleteEvent(@Body() payload: DeleteEventDto): Promise<OutputDto<Event>> {
    return this.eventService.deleteEvent(payload);
  }
}
