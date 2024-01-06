import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entitiy';
import { Writing } from './entities/writing';
import { WritingController } from './writing.controller';
import { WritingService } from './writing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Writing]),
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
  controllers: [WritingController],
  providers: [WritingService],
})
export class WritingModule {}
