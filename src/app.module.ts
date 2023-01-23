import { Module } from '@nestjs/common';

import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigAppModule } from './config/config.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { UploadsModule } from './uploads/uploads.module';
import { KakaoModule } from './kakao/kakao.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigAppModule, TypeormModule, LocationModule, UserModule, UploadsModule, KakaoModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
