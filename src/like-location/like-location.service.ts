import { BadRequestException, Body, ConflictException, Headers, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { OutputDto } from 'src/commons/dtos';
import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import {
  GetLikeLocationsHeaderDto,
  LikeLocationCrudDto,
  LikeLocationHeaderDto,
  UnlikeLocationCrudDto,
  UnlikeLocationHeaderDto,
} from './dto/like-location';
import { LikeLocation } from './entities/like-location.entitiy';

@Injectable()
export class LikeLocationService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(LikeLocation) private readonly likeLocations: Repository<LikeLocation>,
    @InjectRepository(Location) private readonly locations: Repository<Location>,
    private readonly jwtService: JwtService,
  ) {}

  async likeLocation(
    @Body() payload: LikeLocationCrudDto,
    @Headers() header: LikeLocationHeaderDto,
  ): Promise<OutputDto<boolean>> {
    const { locationNo } = payload;
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;

    try {
      const LikeLocation = await this.likeLocations.findOne({
        where: {
          user: {
            no,
          },
          deletedAt: IsNull(),
          location: {
            no: locationNo,
          },
        },
        relations: ['user', 'location'],
        loadRelationIds: true,
      });
      if (LikeLocation?.no) {
        throw new ConflictException('이미 좋아요를 했습니다.');
      } else {
        const User = await this.users.findOne({
          where: {
            no,
          },
        });
        const Location = await this.locations.findOne({
          where: {
            no: locationNo,
          },
        });

        await this.likeLocations.save(
          this.likeLocations.create({
            user: User,
            location: Location,
          }),
        );
        return {
          statusCode: 200,
          data: true,
        };
      }
    } catch (e) {
      console.error(`좋아요 api 오류: ${e}`);
      throw e;
    }
  }

  async unlikeLocation(
    @Body() payload: UnlikeLocationCrudDto,
    @Headers() header: UnlikeLocationHeaderDto,
  ): Promise<OutputDto<boolean>> {
    const { locationNo } = payload;
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;

    try {
      const LikeLocation = await this.likeLocations.findOne({
        where: {
          user: {
            no,
          },
          deletedAt: IsNull(),
          location: {
            no: locationNo,
          },
        },
        relations: ['user', 'location'],
        loadRelationIds: true,
      });

      if (!LikeLocation?.no) {
        throw new ConflictException('이미 삭제한 좋아요입니다.');
      } else {
        this.likeLocations.delete(LikeLocation.no);
        return {
          statusCode: 200,
          data: true,
        };
      }
    } catch (e) {
      console.error(`좋아요 api 오류: ${e}`);
      throw e;
    }
  }

  /**
   * @param {GetLikeLocationsHeaderDto} header 헤더값
   * @description 입지 좋아요 정보들을 가져온다.
   * @return {OutputDto<LikeLocation[]>} 입지 좋아요 정보들을 가져온다.
   * @author in-ch, 2023-06-21
   */
  async getLikeLocations(
    @Headers() header: GetLikeLocationsHeaderDto,
  ): Promise<OutputDto<LikeLocation[]>> {
    try {
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;
      const likeLocations = await this.likeLocations.find({
        where: {
          user: {
            no,
          },
          deletedAt: IsNull(),
        },
        relations: ['location'],
      });
      return {
        totalCount: likeLocations.length,
        statusCode: 200,
        data: likeLocations,
      };
    } catch (e) {
      console.error(`getLocation error: ${e}`);
      throw new BadRequestException('존재하지 않거나 잘못된 매물 정보를 요청하였습니다.');
    }
  }
}
