import { IsBoolean, IsNumber } from 'class-validator';

export class OutputDto<T> {
  @IsBoolean()
  isDone: boolean;

  @IsNumber()
  status: number;

  data: T;
}