import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { IsNull, Repository } from 'typeorm';
import { MessageProps } from './chat.gateway';
import { ChatCrudDto } from './dto/chat.dto';
import { Chat, MESSAGE_TYPE } from './entities/chat.entitiy';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chats: Repository<Chat>,
    @InjectRepository(User) private users: Repository<User>,
  ) {}
  async createMessage(message: MessageProps): Promise<OutputDto<Chat>> {
    try {
      const { id, toUserNo, toUserProfile, fromUserNo, fromUserProfile, type, data } = message;
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

  async getMessages(@Body() payload: ChatCrudDto): Promise<OutputDto<Chat[]>> {
    try {
      const MESSAGES = await this.chats.find({
        where: [
          {
            toUser: {
              no: payload.toUserNo,
            },
            fromUser: {
              no: payload.fromUserNo,
            },
          },
          {
            toUser: {
              no: payload.fromUserNo,
            },
            fromUser: {
              no: payload.toUserNo,
            },
          },
        ],
      });
      return {
        statusCode: 200,
        totalCount: MESSAGES.length,
        data: MESSAGES,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
