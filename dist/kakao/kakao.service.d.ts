import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { KakaoLoginInputDto, KakaoLoginOutputDto, LogoutInputDto, LogoutOutputDto, MeInputDto, RefreshInputDto, RefreshOkOutputDto } from './dto/kakao.dto';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
export declare class KakaoService {
    private readonly users;
    private readonly httpService;
    private readonly jwtService;
    constructor(users: Repository<User>, httpService: HttpService, jwtService: JwtService);
    me(header: MeInputDto): Promise<{
        statusCode: number;
        data: any;
    }>;
    refresh(payload: RefreshInputDto): Promise<OutputDto<RefreshOkOutputDto>>;
    logout(header: LogoutInputDto): Promise<OutputDto<LogoutOutputDto>>;
    kakaoLogin(params: KakaoLoginInputDto): Promise<OutputDto<KakaoLoginOutputDto>>;
}
