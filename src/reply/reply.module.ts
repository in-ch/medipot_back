import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Writing } from 'src/writing/entities/writing';
import { User } from 'src/user/entities/user.entitiy';
import { Alarm } from 'src/alarm/entities/alarm.entitiy';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { AlarmService } from 'src/alarm/alarm.service';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { Reply } from './entities/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Writing, User, Reply, Alarm, NestedReply]),
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
  controllers: [ReplyController],
  providers: [ReplyService, AlarmService],
})
export class ReplyModule {}
