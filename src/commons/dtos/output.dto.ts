import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class OutputDto<T> {
  @IsBoolean()
  isDone: boolean;

  @IsNumber()
  status: number;

  data?: T;

  @IsString()
  error?: string;

  totalCount?: number;
}

export class PageOutput<T> {
  page: number;
  list: T;
}
