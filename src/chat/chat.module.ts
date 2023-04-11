import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { Chat } from './entities/chat.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [],
  providers: [ChatGateway],
})
export class ChatModule {}
