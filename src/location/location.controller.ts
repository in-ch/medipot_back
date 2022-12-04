import { Controller, Get } from '@nestjs/common';

import { LocationService } from './location.service';

@Controller('location')
export class LocationController {

    constructor(private readonly locationsService: LocationService){}

    @Get() 
    getLocation(): string[] {
        return this.locationsService.getLocations();
    }
}
