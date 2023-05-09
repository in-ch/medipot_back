import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { ALARM_TYPE } from '../entities/alarm.entitiy';

export class AddAlaramPayload {
  @ApiProperty()
  @IsNumber()
  userNo: number;

  @ApiProperty()
  @IsEnum(ALARM_TYPE)
  type: ALARM_TYPE;
}
