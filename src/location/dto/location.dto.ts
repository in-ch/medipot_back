import { IsArray, IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';
export class LocationCrudDto {
  @IsString()
  name: string;

  @IsNumber()
  deposit: number;

  @IsNumber()
  depositMonly: number;

  @IsNumber()
  premium: number;

  @IsNumber()
  manageCost: number;

  @IsNumber()
  brokerage: number;

  @IsArray()
  departments: string[];

  @IsArray()
  keywords: string[];

  @IsNumber()
  dedicatedArea: number;

  @IsNumber()
  supplyArea: number;

  @IsString()
  readonly etc?: string;

  @IsString()
  address: string;

  @IsString()
  detail: string;

  @IsArray()
  imgs: string[];

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
export class LocationOutputCrudDto extends LocationCrudDto {}

export class LocationUpdateApprovedCrudDto {
  @IsNumber()
  no: number;
}

export class GetGeoLocationsPaginationDto extends PaginationDto {
  @IsNumber()
  zoom?: number;

  @IsNumber()
  lat?: number;

  @IsNumber()
  lng?: number;

  @IsArray()
  deposit?: number[];

  @IsArray()
  depositMonly?: number[];

  @IsArray()
  manageCost?: number[];

  @IsArray()
  dedicatedArea?: number[];

  @IsArray()
  supplyArea?: number[];

  @IsArray()
  keywords?: string[];

  @IsArray()
  departmentsValue?: string[];
}
