import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Between, Like, Repository } from 'typeorm';

import { OutputDto, PaginationDto } from 'src/commons/dtos';
import { NoDto } from 'src/commons/dtos/no.dto';
import {
  GetGeoLocationsPaginationDto,
  LocationCreateHeaderDto,
  LocationCrudDto,
  LocationOutputCrudDto,
  LocationUpdateApprovedCrudDto,
} from './dto/location.dto';
import { Location } from './entities/location.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entitiy';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private readonly locations: Repository<Location>,
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly notionService: NotionService,
  ) {}

  /**
   * @param {NoDto} query 쿼리값
   * @description 입지 정보들을 가져온다.
   * @return {OutputDto<LocationOutputCrudDto>} 입지 정보를 가져온다.
   * @author in-ch, 2022-12-07
   */
  async getLocation(query: NoDto): Promise<OutputDto<LocationOutputCrudDto>> {
    try {
      const { no } = query;
      const numberNo = Number(no);
      if (!isNaN(numberNo)) {
        const location = await this.locations.findOne({
          where: {
            no: Number(no),
          },
          relations: ['user'],
        });
        if (!location?.no) {
          throw new BadRequestException('존재하지 않는 매물입니다.');
        }
        return {
          statusCode: 200,
          data: location,
        };
      }
    } catch (e) {
      console.error(`getLocation error: ${e}`);
      throw new BadRequestException('존재하지 않거나 잘못된 매물 정보를 요청하였습니다.');
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
      const totalCount = locations.length;
      return {
        totalCount,
        statusCode: 200,
        data: locations,
      };
    } catch (e) {
      console.error(`getLocations API error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {GetGeoLocationsPaginationDto} query 쿼리값 + zoom, lat, lng
   * @description zoom, lat, lng 정보들을 통해 입지 정보들을 가져온다.
   * @description 검색 조건 값들을 추가했다. deposit, .... departmentsValue 등,,
   * @return {OutputDto<LocationOutputCrudDto[]>}  입지 정보들을 리턴.
   * @author in-ch, 2022-12-30, 2023-01-05
   */
  async getGeoLocations(
    query: GetGeoLocationsPaginationDto,
  ): Promise<OutputDto<LocationOutputCrudDto[]>> {
    const {
      limit,
      page,
      zoom,
      lat,
      lng,
      deposit,
      depositMonly,
      manageCost,
      dedicatedArea,
      supplyArea,
      keywords,
      departmentsValue,
      text,
    } = query;

    const parseZoom = (zoom * 0.31) / 2;
    const depositArray = String(deposit).split(',');
    const depositMonlyArray = String(depositMonly).split(',');
    const manageCostArray = String(manageCost).split(',');
    const dedicatedAreaArray = String(dedicatedArea).split(',');
    const supplyAreaArray = String(supplyArea).split(',');
    const departmentsValueArray = String(departmentsValue).split(',');
    const keywordsArray = String(keywords).split(',');

    try {
      const locations = await this.locations.find({
        take: limit || 10,
        skip: page * limit || 0,
        where: [
          {
            lat: Between(Number(lat) - Number(parseZoom), Number(lat) + Number(parseZoom)),
            lng: Between(Number(lng) - Number(parseZoom), Number(lng) + Number(parseZoom)),
            deposit: Between(
              Number(depositArray[0]) * Number(1000),
              Number(depositArray[1]) !== 100 ? Number(depositArray[1]) * Number(1000) : 2147483640,
            ),
            depositMonly: Between(
              Number(depositMonlyArray[0]) * Number(100),
              Number(depositMonlyArray[1]) !== 100
                ? Number(depositMonlyArray[1]) * Number(100)
                : 2147483640,
            ),
            manageCost: Between(
              Number(manageCostArray[0]) * Number(20),
              Number(manageCostArray[1]) !== 100
                ? Number(manageCostArray[1]) * Number(20)
                : 2147483640,
            ),
            dedicatedArea: Between(
              Number(dedicatedAreaArray[0]) * Number(20),
              Number(dedicatedAreaArray[1]) !== 100
                ? Number(dedicatedAreaArray[1]) * Number(20)
                : 2147483640,
            ),
            supplyArea: Between(
              Number(supplyAreaArray[0]) * Number(20),
              Number(supplyAreaArray[1]) !== 100
                ? Number(supplyAreaArray[1]) * Number(20)
                : 2147483640,
            ),
            departments: ArrayContains(
              departmentsValueArray.length > 0 && departmentsValueArray[0] !== ''
                ? departmentsValueArray
                : [],
            ),
            keywords: ArrayContains(
              keywordsArray.length > 0 && keywordsArray[0] !== '' ? keywordsArray : [],
            ),
            isApproved: true,
            address: Like(`%${text}%`),
          },
          {
            lat: Between(Number(lat) - Number(parseZoom), Number(lat) + Number(parseZoom)),
            lng: Between(Number(lng) - Number(parseZoom), Number(lng) + Number(parseZoom)),
            deposit: Between(
              Number(depositArray[0]) * Number(1000),
              Number(depositArray[1]) !== 100 ? Number(depositArray[1]) * Number(1000) : 2147483640,
            ),
            depositMonly: Between(
              Number(depositMonlyArray[0]) * Number(100),
              Number(depositMonlyArray[1]) !== 100
                ? Number(depositMonlyArray[1]) * Number(100)
                : 2147483640,
            ),
            manageCost: Between(
              Number(manageCostArray[0]) * Number(20),
              Number(manageCostArray[1]) !== 100
                ? Number(manageCostArray[1]) * Number(20)
                : 2147483640,
            ),
            dedicatedArea: Between(
              Number(dedicatedAreaArray[0]) * Number(20),
              Number(dedicatedAreaArray[1]) !== 100
                ? Number(dedicatedAreaArray[1]) * Number(20)
                : 2147483640,
            ),
            supplyArea: Between(
              Number(supplyAreaArray[0]) * Number(20),
              Number(supplyAreaArray[1]) !== 100
                ? Number(supplyAreaArray[1]) * Number(20)
                : 2147483640,
            ),
            departments: ArrayContains(
              departmentsValueArray.length > 0 && departmentsValueArray[0] !== ''
                ? departmentsValueArray
                : [],
            ),
            keywords: ArrayContains(
              keywordsArray.length > 0 && keywordsArray[0] !== '' ? keywordsArray : [],
            ),
            isApproved: true,
            name: Like(`%${text}%`),
          },
          {
            lat: Between(Number(lat) - Number(parseZoom), Number(lat) + Number(parseZoom)),
            lng: Between(Number(lng) - Number(parseZoom), Number(lng) + Number(parseZoom)),
            deposit: Between(
              Number(depositArray[0]) * Number(1000),
              Number(depositArray[1]) !== 100 ? Number(depositArray[1]) * Number(1000) : 2147483640,
            ),
            depositMonly: Between(
              Number(depositMonlyArray[0]) * Number(100),
              Number(depositMonlyArray[1]) !== 100
                ? Number(depositMonlyArray[1]) * Number(100)
                : 2147483640,
            ),
            manageCost: Between(
              Number(manageCostArray[0]) * Number(20),
              Number(manageCostArray[1]) !== 100
                ? Number(manageCostArray[1]) * Number(20)
                : 2147483640,
            ),
            dedicatedArea: Between(
              Number(dedicatedAreaArray[0]) * Number(20),
              Number(dedicatedAreaArray[1]) !== 100
                ? Number(dedicatedAreaArray[1]) * Number(20)
                : 2147483640,
            ),
            supplyArea: Between(
              Number(supplyAreaArray[0]) * Number(20),
              Number(supplyAreaArray[1]) !== 100
                ? Number(supplyAreaArray[1]) * Number(20)
                : 2147483640,
            ),
            departments: ArrayContains(
              departmentsValueArray.length > 0 && departmentsValueArray[0] !== ''
                ? departmentsValueArray
                : [],
            ),
            keywords: ArrayContains(
              keywordsArray.length > 0 && keywordsArray[0] !== '' ? keywordsArray : [],
            ),
            isApproved: true,
            detailAddress: Like(`%${text}%`),
          },
        ],
      });

      const totalCount = locations.length;

      return {
        totalCount,
        statusCode: 200,
        data: locations,
      };
    } catch (e) {
      console.error(`getGeoLocation API error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {LocationCrudDto} payload 생성할 입지 정보들
   * @param {LocationCreateHeaderDto} header access_token
   * @description 입지 정보들을 가져온다.
   * @return {OutputDto<LocationOutputCrudDto>} 입지 생성 후 결과를 알려준다.
   * @author in-ch, 2022-12-07
   */
  async createLocation(
    payload: LocationCrudDto,
    header: LocationCreateHeaderDto,
  ): Promise<OutputDto<LocationOutputCrudDto>> {
    try {
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;

      const User = await this.users.findOne({
        where: {
          no,
        },
      });

      const newLocation = await this.locations.create({
        ...payload,
        user: User,
      });

      this.locations.save(newLocation);

      await this.notionService.notionInsertLocation({
        name: newLocation.name,
        address: newLocation.address,
        keywords: newLocation.keywords,
        departments: newLocation.departments,
        userName: User.nickname,
      });

      return {
        statusCode: 200,
        data: newLocation,
      };
    } catch (e) {
      console.error(`create location API error: ${e}`);
      throw e;
    }
  }

  /**
   * @param {LocationCrudDto} no 변경할 입지의 number
   * @description 입지의 승인 여부를 수정한다,
   * @return {OutputDto<LocationOutputCrudDto>}
   * @author in-ch, 2022-12-25
   */
  async updateApproveredLocation(
    payload: LocationUpdateApprovedCrudDto,
  ): Promise<OutputDto<LocationOutputCrudDto>> {
    try {
      const { no } = payload;
      const location = await this.locations.findOne({
        where: {
          no,
        },
      });
      if (!location?.no) {
        throw new BadRequestException('존재하지 않는 매물입니다.');
      }
      location.isApproved = !location.isApproved;
      this.locations.save(location);
      return {
        statusCode: 200,
        data: location,
      };
    } catch (e) {
      console.error(`updateApproveredLocation API error: ${e}`);
      throw e;
    }
  }
}
