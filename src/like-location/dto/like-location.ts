import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LikeLocationCrudDto {
  @ApiProperty()
  @IsNumber()
  locationNo: number;
}
export class LikeLocationHeaderDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}
export class UnlikeLocationCrudDto extends LikeLocationCrudDto {}

export class UnlikeLocationHeaderDto extends LikeLocationHeaderDto {}
