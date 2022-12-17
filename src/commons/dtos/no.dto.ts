import { IsNumber } from 'class-validator';

export class NoDto {
  @IsNumber()
  no?: number;
}