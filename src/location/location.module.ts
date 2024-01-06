import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';
import { Location } from './entities/location.entitiy';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, User]),
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
  controllers: [LocationController],
  providers: [LocationService, NotionService],
})
export class LocationModule {}
