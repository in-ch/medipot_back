import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class NotionInsertLocationParams {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsArray()
  keywords: string[];

  @ApiProperty()
  @IsArray()
  departments: string[];

  @ApiProperty()
  @IsString()
  userName: string;
}

export class NotionInsertConsultParams {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  detail: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  phone: string;
}

export class NotionInsertReportParams {
  @ApiProperty()
  @IsString()
  contentId: string;

  @ApiProperty()
  @IsString()
  tag: string;

  @ApiProperty()
  @IsString()
  reportUserName: string;

  @ApiProperty()
  @IsString()
  reportedUserName: string;

  @ApiProperty()
  @IsString()
  detail: string;
}

export class NotionInsertQuestionParams {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  locationUser: string;

  @ApiProperty()
  @IsString()
  locationPhone: string;
}
