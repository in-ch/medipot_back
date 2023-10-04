import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LikeLocationCrudDto {
  @ApiProperty()
  locationNo: number;
}
export class LikeLocationHeaderDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}
export class UnlikeLocationCrudDto extends LikeLocationCrudDto {}

export class UnlikeLocationHeaderDto extends LikeLocationHeaderDto {}
export class GetLikeLocationsHeaderDto extends LikeLocationHeaderDto {}
