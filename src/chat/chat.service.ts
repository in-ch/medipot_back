import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Request } from 'express';

import { AlarmService } from 'src/alarm/alarm.service';
import { ALARM_TYPE } from 'src/alarm/entities/alarm.entitiy';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { MessageProps } from './chat.gateway';
import { ChatCrudDto } from './dto/chat.dto';
import { Chat, MESSAGE_TYPE } from './entities/chat.entitiy';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chats: Repository<Chat>,
    @InjectRepository(User) private users: Repository<User>,
    private readonly alarmService: AlarmService,
  ) {}

  /**
   * @param {MessageProps} params   id, toUserNo, toUserProfile, fromUserNo, fromUserProfile, type, data
   * @description 문의를 등록해준다.
   * @return {OutputDto<Chat>} 등록된 채팅 반환
   * @author in-ch, 2023-04-28
   */
  async createMessage(message: MessageProps): Promise<OutputDto<Chat>> {
    try {
      const { toUserNo, fromUserNo, type, data } = message;
      const FROM_USER = await this.users.findOne({
        where: {
          no: Number(fromUserNo),
          deletedAt: IsNull(),
        },
      });
      const TO_USER = await this.users.findOne({
        where: {
          no: Number(toUserNo),
          deletedAt: IsNull(),
        },
      });

      // 알림 추가
      await this.alarmService.addAlarm({
        userNo: Number(toUserNo),
        type: ALARM_TYPE.chat,
      });

      return {
        statusCode: 200,
        data: await this.chats.save(
          this.chats.create({
            message: data,
            fromUser: FROM_USER,
            toUser: TO_USER,
            type: type === MESSAGE_TYPE.message ? MESSAGE_TYPE.message : MESSAGE_TYPE.image,
          }),
        ),
      };
    } catch (e) {
      console.error(`create message API error ${e}`);
      throw e;
    }
  }

  async getMessages(request: Request<ChatCrudDto>): Promise<OutputDto<PageOutput<Chat[]>>> {
    const { page, limit, toUserNo, fromUserNo } = request.query;
    try {
      const MESSAGES = await this.chats.find({
        where: [
          {
            toUser: {
              no: Number(toUserNo),
            },
            fromUser: {
              no: Number(fromUserNo),
            },
          },
          {
            toUser: {
              no: Number(fromUserNo),
            },
            fromUser: {
              no: Number(toUserNo),
            },
          },
        ],
        order: {
          no: 'ASC',
        },
        take: Number(limit) || 100,
        skip: Number(page) * Number(limit) || 0,
        relations: ['toUser', 'fromUser'],
        loadRelationIds: true,
      });
      return {
        statusCode: 200,
        totalCount: MESSAGES.length,
        data: {
          page: Number(page),
          list: MESSAGES,
        },
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
