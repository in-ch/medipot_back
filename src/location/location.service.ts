import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutputDto, PaginationDto } from 'src/commons/dtos';
import { LocationCrudDto, LocationOutputCrudDto } from './dto/location.dto';
import { Location } from './entities/location.entitiy';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location) private readonly locations: Repository<Location>,
    ) {}

    async getLocations(query: PaginationDto): Promise<OutputDto<LocationOutputCrudDto[]>> {
        const {limit, page} = query;

        try{
            const locations = await this.locations.find({
                take: limit || 10,
                skip: page * limit || 0,
            });
            return {
                isDone: true,
                status: 200,
                data: locations,
            }
        } catch(e){
            return {
                isDone: false,
                status: 201,
                error: "오류가 발생하였습니다.",
            }
        }
    }    
    async createLocation(payload: LocationCrudDto): Promise<OutputDto<LocationOutputCrudDto>> {
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
