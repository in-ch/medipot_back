import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { PaginationDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
export class QuestionCrudDto {
  @ApiProperty()
  @IsNumber()
  locationNo: number;
}
export class QuestionOutputCrudDto extends PickType(QuestionCrudDto, ['locationNo']) {
  @ApiProperty()
  user: User;

  location: Location;
}

export class QuestionHeaderDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}

export class QuestionListPagination extends PaginationDto {}
