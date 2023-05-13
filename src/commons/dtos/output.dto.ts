import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum LOGIN_REGISTER_TYPE {
  register = 'REGISTER',
  login = 'LOGIN',
}

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

  @ApiProperty()
  @IsEnum({ enum: LOGIN_REGISTER_TYPE })
  type?: string;
}

export class PageOutput<T> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  totalCount?: number;

  @ApiProperty()
  list: T;
}
