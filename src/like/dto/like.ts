import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LikeCrudDto {
  @ApiProperty()
  @IsNumber()
  writingNo: number;
}
export class LikeHeaderDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}
export class UnlikeCrudDto extends LikeCrudDto {}

export class UnlikeHeaderDto extends LikeHeaderDto {}
