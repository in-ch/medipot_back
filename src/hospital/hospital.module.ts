import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Location } from 'src/location/entities/location.entitiy';
import { Hospital } from './entities/hospital.entitiy';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, Location])],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
