import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { PaginationDto } from 'src/commons/dtos';

export class ReportCrudDto {
  @ApiProperty()
  @IsNumber()
  writingNo: number;
}
export class ReportHeaderDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}

export class ReportListPagination extends PaginationDto {}

export class ReportReplyCrudDto {
  @ApiProperty()
  @IsNumber()
  replyNo: number;
}
