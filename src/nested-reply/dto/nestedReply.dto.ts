import { IsNumber, IsString } from 'class-validator';

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
