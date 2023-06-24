import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { LikeLocation } from './entities/like-location.entitiy';
import { LikeLocationController } from './like-location.controller';
import { LikeLocationService } from './like-location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeLocation, Location, User]),
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

  controllers: [LikeLocationController],
  providers: [LikeLocationService],
})
export class LikeLocationModule {}
