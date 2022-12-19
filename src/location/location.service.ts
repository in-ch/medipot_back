import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutputDto, PaginationDto } from 'src/commons/dtos';
import { LocationCrudDto, LocationOutputCrudDto } from './dto/location.dto';
import { Location } from './entities/location.entitiy';
import { NoDto } from 'src/commons/dtos/no.dto';

@Injectable()
export class LocationService {
  constructor(@InjectRepository(Location) private readonly locations: Repository<Location>) {}

  /**
   * @param {NoDto} query 쿼리값
   * @description 입지 정보들을 가져온다.
   * @return {OutputDto<LocationOutputCrudDto>} 입지 정보를 가져온다.
   * @author in-ch, 2022-12-07
   */
  async getLocation(query: NoDto): Promise<OutputDto<LocationOutputCrudDto>> {
    try {
      const { no } = query;
      const location = await this.locations.findOne({
        where: {
          no,
        },
      });
      return {
        isDone: true,
        status: 200,
        data: location,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: '오류가 발생하였습니다.',
      };
    }
  }
  /**
   * @param {PaginationDto} query 쿼리값
   * @description 입지 정보들을 가져온다.
   * @return {OutputDto<LocationOutputCrudDto[]>} 입지 정보들을 가져온다.
   * @author in-ch, 2022-12-07
   */
  async getLocations(query: PaginationDto): Promise<OutputDto<LocationOutputCrudDto[]>> {
    const { limit, page } = query;
    try {
      const locations = await this.locations.find({
        take: limit || 10,
        skip: page * limit || 0,
      });
      const totalCount = await this.locations.count();
      return {
        totalCount,
        isDone: true,
        status: 200,
        data: locations,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: '오류가 발생하였습니다.',
      };
    }
  }

  /**
   * @param {LocationCrudDto} payload 생성할 입지 정보들
   * @description 입지 정보들을 가져온다.
   * @return {OutputDto<LocationOutputCrudDto>} 입지 생성 후 결과를 알려준다.
   * @author in-ch, 2022-12-07
   */
  async createLocation(payload: LocationCrudDto): Promise<OutputDto<LocationOutputCrudDto>> {
    try {
      const newLocation = this.locations.create(payload);
      this.locations.save(newLocation);
      return {
        isDone: true,
        status: 200,
        data: newLocation,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: '오류가 발생하였습니다.',
      };
    }
  }
}
