import { Request } from 'express';
import { OutputDto, PaginationDto } from 'src/commons/dtos';
import { NoDto } from 'src/commons/dtos/no.dto';
import { GetGeoLocationsPaginationDto, LocationCreateHeaderDto, LocationCrudDto, LocationOutputCrudDto, LocationUpdateApprovedCrudDto } from './dto/location.dto';
import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationsService;
    constructor(locationsService: LocationService);
    getLocation(request: Request<NoDto>): Promise<OutputDto<LocationOutputCrudDto>>;
    getLocations(request: Request<PaginationDto>): Promise<OutputDto<LocationOutputCrudDto[]>>;
    getGeoLocations(request: Request<GetGeoLocationsPaginationDto>): Promise<OutputDto<LocationOutputCrudDto[]>>;
    createLocation(payload: LocationCrudDto, header: LocationCreateHeaderDto): Promise<OutputDto<LocationOutputCrudDto>>;
    updateApproveredLocation(payload: LocationUpdateApprovedCrudDto): Promise<OutputDto<LocationOutputCrudDto>>;
}
