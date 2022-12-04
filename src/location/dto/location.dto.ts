import { IsArray, IsNumber, IsString } from 'class-validator';
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

    @IsString()
    readonly etc: string;

    @IsString()
    address: string;

    @IsString()
    detail: string;

    @IsArray()
    imgs: string[];
}

export class LocationOutputCrudDto extends LocationCrudDto  {}