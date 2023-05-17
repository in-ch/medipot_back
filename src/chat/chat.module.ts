import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmService } from 'src/alarm/alarm.service';
import { Alarm } from 'src/alarm/entities/alarm.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { ChatController } from './chat.controller';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, User, Alarm]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('PRIVATE_KEY'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, AlarmService],
})
export class ChatModule {}
