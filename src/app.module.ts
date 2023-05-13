import { Module, OnApplicationBootstrap } from '@nestjs/common';

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
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './utills/schedule/schedule.service';
import { AlarmModule } from './alarm/alarm.module';
import { NaverModule } from './naver/naver.module';

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
    ScheduleModule.forRoot(),
    AlarmModule,
  ],
  controllers: [],
  providers: [ScheduleService],
})
export class AppModule {}
