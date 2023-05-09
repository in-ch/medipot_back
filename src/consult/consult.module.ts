import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entitiy';
import { ConsultController } from './consult.controller';
import { ConsultService } from './consult.service';
import { Consult } from './entities/consult.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consult, User]),

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
  controllers: [ConsultController],
  providers: [ConsultService, NotionService],
})
export class ConsultModule {}
