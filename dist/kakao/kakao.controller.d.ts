import { OutputDto } from 'src/commons/dtos';
import { MeInputDto, MeErrorOutputDto, MeOkOutputDto, RefreshInputDto, RefreshOkOutputDto, LogoutInputDto, LogoutOutputDto, KakaoLoginInputDto, KakaoLoginOutputDto } from './dto/kakao.dto';
import { KakaoService } from './kakao.service';
export declare class KakaoController {
    private readonly kakaoService;
    constructor(kakaoService: KakaoService);
    me(header: MeInputDto): Promise<OutputDto<MeOkOutputDto | MeErrorOutputDto>>;
    refresh(params: RefreshInputDto): Promise<OutputDto<RefreshOkOutputDto>>;
    logout(header: LogoutInputDto): Promise<OutputDto<LogoutOutputDto>>;
    kakaoLogin(params: KakaoLoginInputDto): Promise<OutputDto<KakaoLoginOutputDto>>;
}
