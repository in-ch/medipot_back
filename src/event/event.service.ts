import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Request } from 'express';

import { OutputDto } from 'src/commons/dtos';
import {
  DeleteEventDto,
  EventCrudDto,
  EventListPagination,
  EventUpdateDto,
  GetEventDto,
} from './dto/event.dto';
import { Event } from './entities/event.entitiy';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private readonly events: Repository<Event>) {}

  async list(query: EventListPagination): Promise<OutputDto<Event[]>> {
    try {
      const { page, limit } = query;
      const currentDate = new Date();

      const events = await this.events.find({
        take: limit || 10,
        skip: page * limit || 0,
        where: {
          startDate: LessThanOrEqual(currentDate.toISOString()),
          endDate: MoreThanOrEqual(currentDate.toISOString()),
        },
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
   * @param {EventCrudDto} payload 조회할 이벤트
   * @description 이벤트를 단건 조회한다.
   * @return {OutputDto<Event>} 이벤트 조회
   * @author in-ch, 2023-08-15
   */
  async getEvent(request: Request<GetEventDto>): Promise<OutputDto<Event>> {
    try {
      const { eventNo } = request.query;
      const event = await this.events.findOne({
        where: {
          no: Number(eventNo),
        },
        select: ['detail', 'title', 'img', 'href', 'startDate', 'endDate'],
      });
      return {
        statusCode: 200,
        data: event,
      };
    } catch (e) {
      console.error(`get event API error: ${e}`);
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

  /**
   * @param {EventUpdateDto} payload 수정할 이벤트 정보들
   * @description 이벤트를 수정한다.
   * @return {OutputDto<Event>} 이벤트 수정
   * @author in-ch, 2023-08-15
   */
  async updateEvent(payload: EventUpdateDto): Promise<OutputDto<Event>> {
    try {
      const { eventNo, img, title, detail, href, startDate, endDate } = payload;
      const event = await this.events.findOne({
        where: {
          no: eventNo,
        },
      });
      event.img = img;
      event.title = title;
      event.detail = detail;
      event.href = href;
      event.startDate = startDate;
      event.endDate = endDate;
      this.events.save(event);
      return {
        statusCode: 200,
        data: event,
      };
    } catch (e) {
      console.error(`update event API error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {DeleteEventDto} payload 삭제할 이벤트 정보들
   * @description 이벤트를 삭제한다.
   * @return {OutputDto<Event>} 이벤트 삭제
   * @author in-ch, 2023-08-15
   */
  async deleteEvent(payload: DeleteEventDto): Promise<OutputDto<Event>> {
    try {
      const { eventNo } = payload;
      const event = await this.events.findOne({
        where: {
          no: eventNo,
        },
      });
      if (!event?.no) {
        throw new BadRequestException('이미 삭제되었거나 없는 이벤트입니다.');
      }
      await this.events.softDelete({
        no: eventNo,
      });
      return {
        statusCode: 200,
        data: event,
      };
    } catch (e) {
      console.error(`delete event API error: ${e}`);
      throw e;
    }
  }
}
