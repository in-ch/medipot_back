import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutputDto } from 'src/commons/dtos';
import { EventCrudDto, EventListPagination } from './dto/event.dto';
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

  /**
   * @param {EventCrudDto} payload 생성할 이벤트 정보들
   * @description 이벤트를 생성한다.
   * @return {OutputDto<Event>} 이벤트 생성
   * @author in-ch, 2023-08-15
   */
  async createEvent(payload: EventCrudDto): Promise<OutputDto<Event>> {
    try {
      const newEvent = await this.events.create({
        ...payload,
      });
      this.events.save(newEvent);

      return {
        statusCode: 200,
        data: newEvent,
      };
    } catch (e) {
      console.error(`create event API error: ${e}`);
      throw e;
    }
  }
}
