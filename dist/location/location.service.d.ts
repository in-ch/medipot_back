import { Repository } from 'typeorm';
import { OutputDto, PaginationDto } from 'src/commons/dtos';
import { NoDto } from 'src/commons/dtos/no.dto';
import { GetGeoLocationsPaginationDto, LocationCreateHeaderDto, LocationCrudDto, LocationOutputCrudDto, LocationUpdateApprovedCrudDto } from './dto/location.dto';
import { Location } from './entities/location.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entitiy';
export declare class LocationService {
    private readonly locations;
    private readonly users;
    private readonly jwtService;
    private readonly notionService;
    constructor(locations: Repository<Location>, users: Repository<User>, jwtService: JwtService, notionService: NotionService);
    getLocation(query: NoDto): Promise<OutputDto<LocationOutputCrudDto>>;
    getLocations(query: PaginationDto): Promise<OutputDto<LocationOutputCrudDto[]>>;
    getGeoLocations(query: GetGeoLocationsPaginationDto): Promise<OutputDto<LocationOutputCrudDto[]>>;
    createLocation(payload: LocationCrudDto, header: LocationCreateHeaderDto): Promise<OutputDto<LocationOutputCrudDto>>;
    updateApproveredLocation(payload: LocationUpdateApprovedCrudDto): Promise<OutputDto<LocationOutputCrudDto>>;
}
