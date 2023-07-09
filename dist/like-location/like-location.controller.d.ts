import { OutputDto } from 'src/commons/dtos';
import { GetLikeLocationsHeaderDto, LikeLocationCrudDto, LikeLocationHeaderDto, UnlikeLocationCrudDto, UnlikeLocationHeaderDto } from './dto/like-location';
import { LikeLocation } from './entities/like-location.entitiy';
import { LikeLocationService } from './like-location.service';
export declare class LikeLocationController {
    private readonly likeLocationsService;
    constructor(likeLocationsService: LikeLocationService);
    likeLocation(payload: LikeLocationCrudDto, header: LikeLocationHeaderDto): Promise<OutputDto<boolean>>;
    unlikeLocation(payload: UnlikeLocationCrudDto, header: UnlikeLocationHeaderDto): Promise<OutputDto<boolean>>;
    getLikeLocations(header: GetLikeLocationsHeaderDto): Promise<OutputDto<LikeLocation[]>>;
}
