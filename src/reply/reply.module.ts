import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Writing } from 'src/writing/entities/writing';
import { User } from 'src/user/entities/user.entitiy';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { Reply } from './entities/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Writing, User, Reply]),
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
  providers: [ReplyService],
})
export class ReplyModule {}
