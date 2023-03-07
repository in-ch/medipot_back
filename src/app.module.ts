import { Module } from '@nestjs/common';

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

@Module({
  imports: [
    ConfigAppModule,
    TypeormModule,
    LocationModule,
    UserModule,
    UploadsModule,
    KakaoModule,
    EmailModule,
    AuthModule,
    QuestionModule,
    ConsultModule,
    WritingModule,
    LikeModule,
    ReplyModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
