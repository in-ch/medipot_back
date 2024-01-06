import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

import { PaginationDto } from 'src/commons/dtos';

export class Writing {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsArray()
  imgs: string[];
}
export class WritingCreateDto extends Writing {}
export class WritingCreateOutputDto extends Writing {}

export class WritingListDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  tag?: string;

  @ApiProperty()
  @IsNumber()
  userNo?: number;

  @ApiProperty()
  @IsString()
  text?: string;
}

export class WritingDetailDto {
  @ApiProperty()
  @IsNumber()
  no?: number;
}

export class WritingDeleteDto {
  @ApiProperty()
  @IsNumber()
  writingNo?: number;
}
