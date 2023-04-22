import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entitiy';
import { ChatController } from './chat.controller';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User])],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
