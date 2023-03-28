import { IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';

export class CreateNestedReplyParams {
  @IsNumber()
  replyNo: number;

  @IsString()
  comment: string;
}

export class CreateNestedReplyHeaderParams {
  @IsString()
  authorization: string;
}

export class NestedReplyListPagination extends PaginationDto {
  @IsNumber()
  replyNo: number;
}
export class NestedHeaderDto extends CreateNestedReplyHeaderParams {}

export class DeletedNestedReplyCrudDto {
  @IsNumber()
  nestedReplyNo: number;
}
export class DeletedNestedReplyHeaderDto extends CreateNestedReplyHeaderParams {}
