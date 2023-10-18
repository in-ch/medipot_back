import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class HospitalCrudDto {
  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;
}
