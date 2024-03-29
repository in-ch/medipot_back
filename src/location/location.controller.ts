import { Body, Controller, Delete, Get, Headers, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { number } from 'joi';

import { OutputDto } from 'src/commons/dtos';
import { NoDto } from 'src/commons/dtos/no.dto';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import {
  DeleteLocationDto,
  DeleteLocationHeaderParams,
  GetGeoLocationsPaginationDto,
  GetHospitalListRequestDto,
  GetUserLocationHeader,
  GetUserLocationRequestDto,
  GetUserLocationsOutputDto,
  LocationCreateHeaderDto,
  LocationCrudDto,
  LocationOutputCrudDto,
  LocationUpdateApprovedCrudDto,
  LocationUpdateDto,
} from './dto/location.dto';
import { LocationService } from './location.service';

@ApiTags('입지')
@Controller('location')
export class LocationController {
  constructor(private readonly locationsService: LocationService) {}

  @ApiBody({ type: NoDto })
  @ApiResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto> })
  @Get()
  getLocation(@Req() request: Request<NoDto>): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.getLocation(request.query);
  }

  @ApiBody({ type: GetHospitalListRequestDto })
  @ApiResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto[]> })
  @Get('list')
  getLocations(
    @Req() request: Request<GetHospitalListRequestDto>,
  ): Promise<OutputDto<LocationOutputCrudDto[]>> {
    return this.locationsService.getLocations(request);
  }

  @ApiBody({ type: GetGeoLocationsPaginationDto })
  @ApiResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto[]> })
  @Get('list/geo')
  getGeoLocations(
    @Req() request: Request<GetGeoLocationsPaginationDto>,
  ): Promise<OutputDto<LocationOutputCrudDto[]>> {
    return this.locationsService.getGeoLocations(request.query);
  }

  @ApiBody({ type: LocationCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto> })
  @UseGuards(JwtAuthGuard)
  @Post()
  createLocation(
    @Body() payload: LocationCrudDto,
    @Headers() header: LocationCreateHeaderDto,
  ): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.createLocation(payload, header);
  }

  @ApiBody({ type: LocationUpdateDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto> })
  @UseGuards(JwtAuthGuard)
  @Put()
  updateLocation(
    @Body() payload: LocationUpdateDto,
    @Headers() header: LocationCreateHeaderDto,
  ): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.updateLocation(payload, header);
  }

  @ApiBody({ type: LocationUpdateApprovedCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<LocationOutputCrudDto> })
  @Put('updateApproved')
  updateApproveredLocation(
    @Body() payload: LocationUpdateApprovedCrudDto,
  ): Promise<OutputDto<LocationOutputCrudDto>> {
    return this.locationsService.updateApproveredLocation(payload);
  }

  @ApiBody({ type: number })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<GetUserLocationsOutputDto[]> })
  @UseGuards(JwtAuthGuard)
  @Get('user/locations')
  getUserLocations(
    @Headers() header: GetUserLocationHeader,
  ): Promise<OutputDto<GetUserLocationsOutputDto[]>> {
    return this.locationsService.getUserLocations(header);
  }

  @ApiBody({ type: number })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<GetUserLocationsOutputDto[]> })
  @UseGuards(JwtAuthGuard)
  @Get('user/location')
  getUserLocation(
    @Headers() header: GetUserLocationHeader,
    @Req() request: Request<GetUserLocationRequestDto>,
  ): Promise<OutputDto<GetUserLocationsOutputDto>> {
    return this.locationsService.getUserLocation(header, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteLocation(
    @Body() payload: DeleteLocationDto,
    @Headers() header: DeleteLocationHeaderParams,
  ): Promise<OutputDto<boolean>> {
    return this.locationsService.deleteLocation(payload, header);
  }
}
