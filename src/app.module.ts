import { Module } from '@nestjs/common';

import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigAppModule } from './config/config.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigAppModule,TypeormModule, LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
