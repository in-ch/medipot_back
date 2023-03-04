import { PickType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';

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

export class ReplyPaginationDto extends PaginationDto {
  @IsNumber()
  writingNo: number;
}

export class ReplyDeleteDto {
  @IsNumber()
  replyNo: number;
}

export class TotalCountDto {
  @IsNumber()
  writingNo: number;
}
