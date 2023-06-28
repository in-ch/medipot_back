import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';

import { User } from 'src/user/entities/user.entitiy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthPhone } from './entities/auth-phone.entitiy';
import { Auth } from './entities/auth.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User, AuthPhone])],
  controllers: [AuthController],
  providers: [AuthService, EmailService],
})
export class AuthModule {}
