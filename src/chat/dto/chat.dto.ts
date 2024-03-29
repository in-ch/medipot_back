import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ChatCrudDto {
  @ApiProperty()
  @IsNumber()
  toUserNo: number;

  @ApiProperty()
  @IsNumber()
  fromUserNo: number;

  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  limit: number;
}
