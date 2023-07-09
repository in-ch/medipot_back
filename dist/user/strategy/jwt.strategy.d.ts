import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: any): Promise<import("../../commons/dtos").OutputDto<import("../dto/user.dto").UserLoginOutputCrudDto>>;
}
export {};
