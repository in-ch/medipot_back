import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entitiy';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private chat: Repository<Chat>) {}
  async createMessage(chat: Chat): Promise<Chat> {
    return await this.chat.save(chat);
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chat.find();
  }
}
