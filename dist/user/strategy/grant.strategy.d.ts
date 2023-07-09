import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entitiy';
export declare class GrantGuard implements CanActivate {
    private readonly jwtService;
    private readonly users;
    constructor(jwtService: JwtService, users: Repository<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
