import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class OutputDto<T> {
  @ApiProperty()
  @IsBoolean()
  isDone: boolean;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  @IsString()
  error?: string;

  @ApiProperty()
  @IsNumber()
  totalCount?: number;
}

export class PageOutput<T> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  list: T;
}
