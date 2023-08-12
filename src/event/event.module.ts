import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './entities/event.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
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

  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
