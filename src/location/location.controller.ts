import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OutputDto, PaginationDto } from 'src/commons/dtos';
import { NoDto } from 'src/commons/dtos/no.dto';
import {
  GetGeoLocationsPaginationDto,
  LocationCrudDto,
  LocationOutputCrudDto,
  LocationUpdateApprovedCrudDto,
} from './dto/location.dto';
import { LocationService } from './location.service';

@ApiTags('입지')
@Controller('location')
export class LocationController {
  constructor(private readonly locationsService: LocationService) {}

  @ApiBody({ type: NoDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto> })
  @Get()
  getLocation(@Req() request: Request<NoDto>): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.getLocation(request.query);
  }

  @ApiBody({ type: PaginationDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto[]> })
  @Get('list')
  getLocations(
    @Req() request: Request<PaginationDto>,
  ): Promise<OutputDto<LocationOutputCrudDto[]>> {
    return this.locationsService.getLocations(request.query);
  }

  @ApiBody({ type: GetGeoLocationsPaginationDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto[]> })
  @Get('list/geo')
  getGeoLocations(
    @Req() request: Request<GetGeoLocationsPaginationDto>,
  ): Promise<OutputDto<LocationOutputCrudDto[]>> {
    return this.locationsService.getGeoLocations(request.query);
  }

  @ApiBody({ type: LocationCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto> })
  @Post()
  createLocation(@Body() payload: LocationCrudDto): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.createLocation(payload);
  }

  @ApiBody({ type: LocationUpdateApprovedCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto> })
  @Put('updateApproved')
  updateApproveredLocation(
    @Body() payload: LocationUpdateApprovedCrudDto,
  ): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.updateApproveredLocation(payload);
  }
}
