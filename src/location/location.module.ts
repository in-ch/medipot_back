import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotionService } from 'src/utills/notion/notion.service';

import { Location } from './entities/location.entitiy';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService, NotionService],
})
export class LocationModule {}
