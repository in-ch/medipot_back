import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { Location } from 'src/location/entities/location.entitiy';
import { Between, Repository } from 'typeorm';
import {
  GetHospitalByLocationIdQueryParams,
  GetHospitalQueryParams,
  HospitalCrudDto,
} from './dto/hospital.dto';

import { Hospital } from './entities/hospital.entitiy';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital) private readonly hospitals: Repository<Hospital>,
    @InjectRepository(Location) private readonly locations: Repository<Location>,
  ) {}

  /**
   * @param {HospitalCrudDto} query 쿼리값
   * @description 병원 정보들을 가져온다.
   * @return {OutputDto<Hospital[]>} 병원 정보들을 가져온다.
   * @author in-ch, 2023-10-18
   */
  async getHospitals(request: Request<HospitalCrudDto>): Promise<OutputDto<Hospital[]>> {
    try {
      const parseZoom = 0.005;
      const { lat, lng } = request.query;
      const hospitals = await this.hospitals.find({
        where: {
          lat: Between(Number(lat) - Number(parseZoom), Number(lat) + Number(parseZoom)),
          lng: Between(Number(lng) - Number(parseZoom), Number(lng) + Number(parseZoom)),
        },
      });

      return {
        statusCode: 200,
        data: hospitals,
      };
    } catch (e) {
      console.error(`getHospitals API error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {GetHospitalByLocationIdQueryParams} query 쿼리값
   * @description 입지의 lat, lng를 활용해 주변 병원 정보들을 가져온다.
   * @return {OutputDto<Hospital[]>} 병원 정보들을 가져온다.
   * @author in-ch, 2023-10-23
   */
  async getHospitalsByLocationId(
    request: Request<GetHospitalByLocationIdQueryParams>,
  ): Promise<OutputDto<Hospital[]>> {
    try {
      const { locationNo } = request.query;
      const Location = await this.locations.findOne({
        where: {
          no: Number(locationNo),
        },
      });
      const parseZoom = 0.005;
      const hospitals = await this.hospitals.find({
        where: {
          lat: Between(
            Number(Location?.lat) - Number(parseZoom),
            Number(Location?.lat) + Number(parseZoom),
          ),
          lng: Between(
            Number(Location?.lng) - Number(parseZoom),
            Number(Location?.lng) + Number(parseZoom),
          ),
        },
      });
      return {
        statusCode: 200,
        data: hospitals,
      };
    } catch (e) {
      console.error(`getHospitalsByLocationId API error: ${e}`);
    }
  }

  /**
   * @param {GetHospitalQueryParams} query 쿼리값
   * @description 병원 정보를 가져온다.
   * @return {OutputDto<Hospital>} 병원 정보를 가져온다.
   * @author in-ch, 2023-10-22
   */
  async getHospital(request: Request<GetHospitalQueryParams>): Promise<OutputDto<Hospital>> {
    try {
      const { hospitalNo } = request.query;
      console.log({
        hospitalNo,
      });
      const hospital = await this.hospitals.findOne({
        where: {
          no: Number(hospitalNo),
        },
      });
      return {
        statusCode: 200,
        data: hospital,
      };
    } catch (e) {
      console.error(`getHospital API error: ${e}`);
      throw e;
    }
  }
}
