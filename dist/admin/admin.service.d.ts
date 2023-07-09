import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminUser } from './entities/admin-user.entitiy';
import { AdminUserCreateCrudDto, AdminUserLoginCrudDto, AdminUserOutputCrudDto, AdminUserRefreshCrudDto, AdminUserRefreshOutputCrudDto } from './dto/admin.user.dto';
import { OutputDto } from 'src/commons/dtos';
export declare class AdminService {
    private readonly adminUsers;
    private readonly jwtService;
    constructor(adminUsers: Repository<AdminUser>, jwtService: JwtService);
    private verifyPassword;
    createAdminUser(payload: AdminUserCreateCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>>;
    findOneAdminUser(id: string): Promise<OutputDto<AdminUserOutputCrudDto>>;
    adminLogin(payload: AdminUserLoginCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>>;
    adminRefresh(payload: AdminUserRefreshCrudDto): Promise<OutputDto<AdminUserRefreshOutputCrudDto>>;
}
