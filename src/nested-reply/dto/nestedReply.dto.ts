import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { PaginationDto } from 'src/commons/dtos';

export class CreateNestedReplyParams {
  @ApiProperty()
  @IsNumber()
  replyNo: number;

  @ApiProperty()
  @IsString()
  comment: string;
}

export class CreateNestedReplyHeaderParams {
  @ApiProperty()
  @IsString()
  authorization: string;
}

export class NestedReplyListPagination extends PaginationDto {
  @ApiProperty()
  @IsNumber()
  replyNo: number;
}
export class NestedHeaderDto extends CreateNestedReplyHeaderParams {}

export class DeletedNestedReplyCrudDto {
  @ApiProperty()
  @IsNumber()
  nestedReplyNo: number;
}
export class DeletedNestedReplyHeaderDto extends CreateNestedReplyHeaderParams {}
