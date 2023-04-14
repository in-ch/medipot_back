import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';
export class LocationCrudDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  deposit: number;

  @ApiProperty()
  @IsNumber()
  depositMonly: number;

  @ApiProperty()
  @IsNumber()
  premium: number;

  @ApiProperty()
  @IsNumber()
  manageCost: number;

  @ApiProperty()
  @IsNumber()
  brokerage: number;

  @ApiProperty()
  @IsArray()
  departments: string[];

  @ApiProperty()
  @IsArray()
  keywords: string[];

  @ApiProperty()
  @IsNumber()
  dedicatedArea: number;

  @ApiProperty()
  @IsNumber()
  supplyArea: number;

  @ApiProperty()
  @IsString()
  readonly etc?: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  detail: string;

  @ApiProperty()
  @IsArray()
  imgs: string[];

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;
}
export class LocationOutputCrudDto extends LocationCrudDto {}

export class LocationUpdateApprovedCrudDto {
  @ApiProperty()
  @IsNumber()
  no: number;
}

export class GetGeoLocationsPaginationDto extends PaginationDto {
  @ApiProperty()
  @IsNumber()
  zoom?: number;

  @ApiProperty()
  @IsNumber()
  lat?: number;

  @ApiProperty()
  @IsNumber()
  lng?: number;

  @ApiProperty()
  @IsArray()
  deposit?: number[];

  @ApiProperty()
  @IsArray()
  depositMonly?: number[];

  @ApiProperty()
  @IsArray()
  manageCost?: number[];

  @ApiProperty()
  @IsArray()
  dedicatedArea?: number[];

  @ApiProperty()
  @IsArray()
  supplyArea?: number[];

  @ApiProperty()
  @IsArray()
  keywords?: string[];

  @ApiProperty()
  @IsArray()
  departmentsValue?: string[];
}
