import { Body, ConflictException, Headers, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos';
import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
import {
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
}
