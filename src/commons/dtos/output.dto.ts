import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OutputDto<T> {
  @ApiProperty()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsString()
  error?: string;

  @ApiProperty()
  @IsString()
  message?: string;

  @ApiProperty()
  data?: T;

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
