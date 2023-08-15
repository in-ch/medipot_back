import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';

export class EventListPagination extends PaginationDto {}

export class EventCrudDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  detail: string;

  @ApiProperty()
  @IsString()
  img: string;

  @ApiProperty()
  @IsString()
  href: string;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate: string;
}

export class EventUpdateDto extends EventCrudDto {
  @ApiProperty()
  @IsNumber()
  eventNo: number;
}

export class DeleteEventDto {
  @ApiProperty()
  @IsNumber()
  eventNo: number;
}
