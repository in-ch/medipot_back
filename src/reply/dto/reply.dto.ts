import { PickType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ReplyCrudDto {
  @IsNumber()
  writingNo: number;

  @IsString()
  comment: string;
}

export class ReplyHeaderDto {
  @IsString()
  authorization: string;
}
