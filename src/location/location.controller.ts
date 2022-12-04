import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { OutputDto, PaginationDto } from 'src/commons/dtos';
import { LocationCrudDto, LocationOutputCrudDto } from './dto/location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationsService: LocationService){}

    @Get() 
    getLocation(
        @Req() request: Request<PaginationDto> 
    ): Promise<OutputDto<LocationOutputCrudDto[]>> {
        return this.locationsService.getLocations(request.query);
    }

    @Post()
    createLocation(
        @Body() payload: LocationCrudDto
    ):Promise<OutputDto<LocationOutputCrudDto>> {
        return this.locationsService.createLocation(payload);
    }
}
