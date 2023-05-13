import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Like } from './entities/like.entitiy';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { Writing } from 'src/writing/entities/writing';
import { User } from 'src/user/entities/user.entitiy';
import { AlarmService } from 'src/alarm/alarm.service';
import { Alarm } from 'src/alarm/entities/alarm.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Writing, User, Alarm]),
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

  controllers: [LikeController],
  providers: [LikeService, AlarmService],
})
export class LikeModule {}
