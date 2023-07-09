import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AdminUser } from '../entities/admin-user.entitiy';
export declare class AdminGuard implements CanActivate {
    private readonly jwtService;
    private readonly admins;
    constructor(jwtService: JwtService, admins: Repository<AdminUser>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
