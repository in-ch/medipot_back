import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';

export class ReplyCrudDto {
  @ApiProperty()
  @IsNumber()
  writingNo: number;

  @ApiProperty()
  @IsString()
  comment: string;
}

export class ReplyHeaderDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}

export class ReplyPaginationDto extends PaginationDto {
  @ApiProperty()
  @IsNumber()
  writingNo: number;
}

export class ReplyDeleteDto {
  @ApiProperty()
  @IsNumber()
  replyNo: number;
}

export class TotalCountDto {
  @ApiProperty()
  @IsNumber()
  writingNo: number;
}
