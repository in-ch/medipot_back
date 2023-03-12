import { PickType } from '@nestjs/mapped-types';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';

export class Writing {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsArray()
  tags: string[];

  @IsArray()
  imgs: string[];
}
export class WritingCreateDto extends Writing {}
export class WritingCreateOutputDto extends Writing {}

export class WritingListDto extends PaginationDto {
  tag?: string;
  userNo?: number;
  text?: string;
}

export class WritingDetailDto {
  @IsNumber()
  no?: number;
}
