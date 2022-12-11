import { Module } from '@nestjs/common';

import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigAppModule } from './config/config.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigAppModule,TypeormModule, LocationModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
