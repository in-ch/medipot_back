import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultController } from './consult.controller';
import { ConsultService } from './consult.service';
import { Consult } from './entities/consult.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Consult])],
  controllers: [ConsultController],
  providers: [ConsultService],
})
export class ConsultModule {}
