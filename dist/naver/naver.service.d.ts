import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { MePayloadDto, NaverLoginOutputDto } from './dto/naver.dto';
export declare class NaverService {
    private readonly users;
    private readonly httpService;
    private readonly jwtService;
    constructor(users: Repository<User>, httpService: HttpService, jwtService: JwtService);
    me(payload: MePayloadDto): Promise<OutputDto<NaverLoginOutputDto>>;
}
