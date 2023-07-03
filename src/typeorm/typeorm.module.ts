import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Auth } from 'src/auth/entities/auth.entitiy';
import { Question } from 'src/question/entities/question.entitiy';
import { Consult } from 'src/consult/entities/consult.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Like } from 'src/like/entities/like.entitiy';
import { Reply } from 'src/reply/entities/reply.entity';
import { Report } from 'src/report/entities/report.entity';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { Chat } from 'src/chat/entities/chat.entitiy';
import { AdminUser } from 'src/admin/entities/admin-user.entitiy';
import { Alarm } from 'src/alarm/entities/alarm.entitiy';
import { UserGrantRequest } from 'src/user/entities/doctorGrant.entitiy';
import { LikeLocation } from 'src/like-location/entities/like-location.entitiy';
import { AuthPhone } from 'src/auth/entities/auth-phone.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [
        Location,
        AdminUser,
        User,
        Auth,
        Question,
        Consult,
        Writing,
        Like,
        Reply,
        Report,
        NestedReply,
        Chat,
        Alarm,
        UserGrantRequest,
        LikeLocation,
        AuthPhone,
      ], // db 들어가는 곳
    }),
  ],
})
export class TypeormModule {}
