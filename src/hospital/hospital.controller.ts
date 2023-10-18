import { Controller, Get, Req } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { HospitalCrudDto } from './dto/hospital.dto';
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
}
