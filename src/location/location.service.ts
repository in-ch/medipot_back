import { Injectable } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos/commons.dto';
import { LocationCreateCrudDto, LocationOutputCrudDto } from './dto/location.dto';

@Injectable()
export class LocationService {

    getLocations(): string[] {
        return ["da","il22y"];
    }    
    createLocation(payload: LocationCreateCrudDto):OutputDto<LocationOutputCrudDto> {
        console.log(payload);
        return {
            isDone: true,
            status: 200,
            data: payload,
        }
    }
}
