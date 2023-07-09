import { JwtService } from '@nestjs/jwt';
import { OutputDto } from 'src/commons/dtos';
import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
import { GetLikeLocationsHeaderDto, LikeLocationCrudDto, LikeLocationHeaderDto, UnlikeLocationCrudDto, UnlikeLocationHeaderDto } from './dto/like-location';
import { LikeLocation } from './entities/like-location.entitiy';
export declare class LikeLocationService {
    private readonly users;
    private readonly likeLocations;
    private readonly locations;
    private readonly jwtService;
    constructor(users: Repository<User>, likeLocations: Repository<LikeLocation>, locations: Repository<Location>, jwtService: JwtService);
    likeLocation(payload: LikeLocationCrudDto, header: LikeLocationHeaderDto): Promise<OutputDto<boolean>>;
    unlikeLocation(payload: UnlikeLocationCrudDto, header: UnlikeLocationHeaderDto): Promise<OutputDto<boolean>>;
    getLikeLocations(header: GetLikeLocationsHeaderDto): Promise<OutputDto<LikeLocation[]>>;
}
