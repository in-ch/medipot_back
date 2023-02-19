import { PickType } from '@nestjs/mapped-types';
import { IsArray, IsString } from 'class-validator';

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
