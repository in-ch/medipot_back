import { OutputDto } from 'src/commons/dtos';
import { MePayloadDto, NaverLoginOutputDto } from './dto/naver.dto';
import { NaverService } from './naver.service';
export declare class NaverController {
    private readonly naverService;
    constructor(naverService: NaverService);
    me(payload: MePayloadDto): Promise<OutputDto<NaverLoginOutputDto>>;
}
