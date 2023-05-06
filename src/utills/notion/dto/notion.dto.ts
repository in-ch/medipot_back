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
