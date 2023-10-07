import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entitiy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Writing } from 'src/writing/entities/writing';
import { UserGrantRequest } from './entities/doctorGrant.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';
import { AdminUser } from 'src/admin/entities/admin-user.entitiy';
import { LikeLocation } from 'src/like-location/entities/like-location.entitiy';
import { Consult } from 'src/consult/entities/consult.entitiy';
import { Location } from 'src/location/entities/location.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Writing,
      UserGrantRequest,
      AdminUser,
      LikeLocation,
      Consult,
      Location,
    ]),
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
  providers: [UserService, JwtStrategy, NotionService],
  controllers: [UserController],
})
export class UserModule {}
