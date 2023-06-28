import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';

import { User } from 'src/user/entities/user.entitiy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthPhone } from './entities/auth-phone.entitiy';
import { Auth } from './entities/auth.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, User, AuthPhone]),
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
  controllers: [AuthController],
  providers: [AuthService, EmailService],
})
export class AuthModule {}
