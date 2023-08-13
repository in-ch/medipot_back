import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos';
import { Repository } from 'typeorm';
import { EventListPagination } from './dto/event.dto';
import { Event } from './entities/event.entitiy';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private readonly events: Repository<Event>) {}

  async list(query: EventListPagination): Promise<OutputDto<Event[]>> {
    try {
      const { page, limit } = query;
      const events = await this.events.find({
        take: limit || 10,
        skip: page * limit || 0,
      });
      const totalCount = events.length;
      return {
        totalCount,
        statusCode: 200,
        data: events,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
