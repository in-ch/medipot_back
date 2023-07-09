import { JwtService } from '@nestjs/jwt';
import { AlarmService } from 'src/alarm/alarm.service';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Repository } from 'typeorm';
import { LikeCrudDto, LikeHeaderDto, UnlikeCrudDto, UnlikeHeaderDto } from './dto/like';
import { Like } from './entities/like.entitiy';
export declare class LikeService {
    private readonly likes;
    private readonly users;
    private readonly writings;
    private readonly jwtService;
    private readonly alarmService;
    constructor(likes: Repository<Like>, users: Repository<User>, writings: Repository<Writing>, jwtService: JwtService, alarmService: AlarmService);
    like(payload: LikeCrudDto, header: LikeHeaderDto): Promise<OutputDto<boolean>>;
    unlike(payload: UnlikeCrudDto, header: UnlikeHeaderDto): Promise<OutputDto<boolean>>;
}
