import { HttpException, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RavenInterceptor, RavenModule } from 'nest-raven';

import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigAppModule } from './config/config.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { UploadsModule } from './uploads/uploads.module';
import { KakaoModule } from './kakao/kakao.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { ConsultModule } from './consult/consult.module';
import { WritingModule } from './writing/writing.module';
import { LikeModule } from './like/like.module';
import { ReplyModule } from './reply/reply.module';
import { ReportModule } from './report/report.module';
import { NestedReplyModule } from './nested-reply/nested-reply.module';
import { ChatModule } from './chat/chat.module';
import { AdminModule } from './admin/admin.module';
import { AlarmModule } from './alarm/alarm.module';
import { NaverModule } from './naver/naver.module';
import { Alarm } from './alarm/entities/alarm.entitiy';
import { User } from './user/entities/user.entitiy';
import { LikeLocationModule } from './like-location/like-location.module';
import { EventModule } from './event/event.module';
import { HospitalModule } from './hospital/hospital.module';
import { WebhookInterceptor } from './webhook.interceptor';

@Module({
  imports: [
    ConfigAppModule,
    TypeormModule,
    LocationModule,
    UserModule,
    UploadsModule,
    KakaoModule,
    NaverModule,
    EmailModule,
    AuthModule,
    QuestionModule,
    ConsultModule,
    WritingModule,
    LikeModule,
    ReplyModule,
    ReportModule,
    NestedReplyModule,
    ChatModule,
    AdminModule,
    AlarmModule,
    TypeOrmModule.forFeature([Alarm, User]),
    LikeLocationModule,
    EventModule,
    HospitalModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          {
            type: HttpException,
            filter: (exception: HttpException) => {
              return 299 > exception.getStatus();
            },
          },
        ],
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: WebhookInterceptor,
    },
  ],
})
export class AppModule {}
