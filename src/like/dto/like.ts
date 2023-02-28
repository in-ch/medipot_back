import { IsNumber, IsString } from 'class-validator';

export class LikeCrudDto {
  @IsNumber()
  writingNo: number;
}
export class LikeHeaderDto {
  @IsString()
  authorization: string;
}
