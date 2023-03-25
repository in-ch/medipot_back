import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { NestedReply } from './entities/nestedReply.entitiy';
import { NestedReplyController } from './nested-reply.controller';
import { NestedReplyService } from './nested-reply.service';
import { User } from 'src/user/entities/user.entitiy';
import { Reply } from 'src/reply/entities/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NestedReply, User, Reply]),

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
  controllers: [NestedReplyController],
  providers: [NestedReplyService],
})
export class NestedReplyModule {}
