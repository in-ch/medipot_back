import { Controller, Get, Req } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { GetHospitalQueryParams, HospitalCrudDto } from './dto/hospital.dto';
import { Hospital } from './entities/hospital.entitiy';

import { HospitalService } from './hospital.service';

@ApiTags('병원')
@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalsService: HospitalService) {}

  @ApiBody({ type: HospitalCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<HospitalCrudDto> })
  @Get()
  getHospitals(@Req() request: Request<HospitalCrudDto>): Promise<OutputDto<Hospital[]>> {
    return this.hospitalsService.getHospitals(request);
  }

  @ApiBody({ type: GetHospitalQueryParams })
  @ApiResponse({ description: '성공 시 Hospital 객체 리턴', type: OutputDto<Hospital> })
  @Get('get')
  getHospital(@Req() request: Request<GetHospitalQueryParams>): Promise<OutputDto<Hospital>> {
    return this.hospitalsService.getHospital(request);
  }
}
