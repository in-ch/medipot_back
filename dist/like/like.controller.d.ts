import { OutputDto } from 'src/commons/dtos';
import { LikeCrudDto, LikeHeaderDto, UnlikeCrudDto, UnlikeHeaderDto } from './dto/like';
import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likesService;
    constructor(likesService: LikeService);
    like(payload: LikeCrudDto, header: LikeHeaderDto): Promise<OutputDto<boolean>>;
    unlike(payload: UnlikeCrudDto, header: UnlikeHeaderDto): Promise<OutputDto<boolean>>;
}
