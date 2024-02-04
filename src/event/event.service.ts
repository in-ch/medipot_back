import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  IsNull,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
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

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private readonly events: Repository<Event>) {}

  /**
   * @param { Request<EventListPagination>} payload 조회할 이벤트의 pagination
   * @description 유효한 이벤트를 조회한다.
   * @return {OutputDto<Event[]>} 유효 이벤트 조회
   * @author in-ch, 2024-01-30
   */
  async list(request: Request<EventListPagination>): Promise<OutputDto<Event[]>> {
    try {
      const { page, limit } = request.query;
      const currentDate = new Date();

      const events = await this.events.find({
        take: Number(limit) || 10,
        skip: Number(page) * Number(limit) || 0,
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
      throw new Error(e);
    }
  }

  /**
   * @param {EventListPagination} payload 조회할 이벤트의 pagination
   * @description 이벤트를 전체 조회한다.
   * @return {OutputDto<Event[]>} 이벤트 전체 조회
   * @author in-ch, 2024-01-30
   */
  async listAll(request: Request<EventListPagination>): Promise<OutputDto<Event[]>> {
    try {
      const { page, limit, keyword, isDeleted } = request.query;
      let where: FindOptionsWhere<Event> | FindOptionsWhere<Event>[] = {
        title: keyword !== undefined ? Like(`%${String(keyword)}%`) : Like('%%'),
      };
      if (isDeleted !== 'ALL') {
        where.deletedAt = isDeleted === 'TRUE' ? IsNull() : Not(IsNull());
      }
      const events = await this.events.find({
        take: Number(limit) || 10,
        skip: Number(page) * Number(limit) || 0,
        where,
        withDeleted: true,
        select: ['no', 'title', 'img', 'href', 'startDate', 'endDate', 'deletedAt'],
      });
      const [_, totalCount] = await this.events.findAndCount({
        where,
        withDeleted: true,
      });
      return {
        totalCount,
        statusCode: 200,
        data: events,
      };
    } catch (e) {
      console.error(e);
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
    }
  }

  /**
   * @param {DeleteEventDto} payload 삭제할 이벤트 정보들
   * @description 이벤트를 삭제한다.
   * @return {OutputDto<Event>} 이벤트 삭제
   * @author in-ch, 2023-08-15
   */
  async activeEvent(payload: ActiveEventDto): Promise<OutputDto<Event>> {
    try {
      const { eventNo } = payload;
      const event = await this.events.findOne({
        where: {
          no: eventNo,
          deletedAt: Not(IsNull()),
        },
        withDeleted: true,
      });
      if (!event?.no) {
        throw new BadRequestException(
          `이미 활성화되었거나 없는 이벤트입니다. 활성화 시도 event id: ${eventNo}`,
        );
      }
      event.deletedAt = null;
      await this.events.save(event);
      return {
        statusCode: 200,
        data: event,
      };
    } catch (e) {
      console.error(`active event API error: ${e}`);
      throw new Error(e);
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
        throw new BadRequestException(
          `이미 삭제되었거나 없는 이벤트입니다. 삭제된 이벤트명 ${event?.title}`,
        );
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
      throw new Error(e);
    }
  }
}
