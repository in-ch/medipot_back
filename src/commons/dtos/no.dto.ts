import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class NoDto {
  @ApiProperty()
  @IsNumber()
  no?: number;
}
