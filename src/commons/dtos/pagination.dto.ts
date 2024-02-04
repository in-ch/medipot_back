import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  limit?: number;

  @ApiProperty()
  @IsNumber()
  page?: number;
}

export class GetListParams extends PaginationDto {
  @ApiProperty()
  @IsString()
  keyword: string;

  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;
}
