import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos/commons.dto';
import { Repository } from 'typeorm';
import { LocationCreateCrudDto, LocationOutputCrudDto } from './dto/location.dto';
import { Location } from './entities/location.entitiy';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location) private readonly locations: Repository<Location>,
    ) {}

    async getLocations(): Promise<string[]>  {
        return ["da","il22y"];
    }    
    async createLocation(payload: LocationCreateCrudDto): Promise<OutputDto<LocationOutputCrudDto>> {
        try{
            const newLocation = this.locations.create(payload);
            console.log("새로운 입지 등록 :" + JSON.stringify(newLocation));
            this.locations.save(newLocation);
            return {
                isDone: true,
                status: 200,
                data: payload,
            }
        } catch(e){
            return {
                isDone: false,
                status: 201,
                error: "오류가 발생하였습니다.",
            }
        }
    }
}
