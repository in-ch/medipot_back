import { PaginationDto } from 'src/commons/dtos';
export declare class LocationCrudDto {
    name: string;
    deposit: number;
    depositMonly: number;
    premium: number;
    manageCost: number;
    departments: string[];
    keywords: string[];
    dedicatedArea: number;
    supplyArea: number;
    readonly etc?: string;
    address: string;
    detail: string;
    imgs: string[];
    lat: number;
    lng: number;
}
export declare class LocationOutputCrudDto extends LocationCrudDto {
}
export declare class LocationCreateHeaderDto {
    authorization: string;
}
export declare class LocationUpdateApprovedCrudDto {
    no: number;
}
export declare class GetGeoLocationsPaginationDto extends PaginationDto {
    zoom?: number;
    lat?: number;
    lng?: number;
    deposit?: number[];
    depositMonly?: number[];
    manageCost?: number[];
    dedicatedArea?: number[];
    supplyArea?: number[];
    keywords?: string[];
    departmentsValue?: string[];
    text?: string;
}
