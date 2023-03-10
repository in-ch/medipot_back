import { IsNumber, IsString } from 'class-validator';

import { PaginationDto } from 'src/commons/dtos';

export class ReportCrudDto {
  @IsNumber()
  writingNo: number;
}
export class ReportHeaderDto {
  @IsString()
  authorization: string;
}

export class ReportListPagination extends PaginationDto {}

export class ReportReplyCrudDto {
  @IsNumber()
  replyNo: number;
}
