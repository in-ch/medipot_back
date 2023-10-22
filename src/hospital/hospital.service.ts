import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { Between, Repository } from 'typeorm';
import { GetHospitalQueryParams, HospitalCrudDto } from './dto/hospital.dto';

import { Hospital } from './entities/hospital.entitiy';

@Injectable()
export class HospitalService {
  constructor(@InjectRepository(Hospital) private readonly hospitals: Repository<Hospital>) {}

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
