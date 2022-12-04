import { Body, Controller, Get, Post } from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos/commons.dto';
import { LocationCreateCrudDto, LocationOutputCrudDto } from './dto/location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationsService: LocationService){}

    @Get() 
    getLocation(): Promise<string[]> {
        return this.locationsService.getLocations();
    }

    @Post()
    createLocation(
        @Body() payload: LocationCreateCrudDto
    ):Promise<OutputDto<LocationOutputCrudDto>> {
        return this.locationsService.createLocation(payload);
    }
}
