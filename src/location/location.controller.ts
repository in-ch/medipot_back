import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';

import { OutputDto, PaginationDto } from 'src/commons/dtos';
import { NoDto } from 'src/commons/dtos/no.dto';
import {
  LocationCrudDto,
  LocationOutputCrudDto,
  LocationUpdateApprovedCrudDto,
} from './dto/location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationsService: LocationService) {}

  @Get()
  getLocation(@Req() request: Request<NoDto>): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.getLocation(request.query);
  }

  @Get('list')
  getLocations(
    @Req() request: Request<PaginationDto>,
  ): Promise<OutputDto<LocationOutputCrudDto[]>> {
    return this.locationsService.getLocations(request.query);
  }

  @Post()
  createLocation(@Body() payload: LocationCrudDto): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.createLocation(payload);
  }

  @Put('updateApproved')
  updateApproveredLocation(
    @Body() payload: LocationUpdateApprovedCrudDto,
  ): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.updateApproveredLocation(payload);
  }
}
