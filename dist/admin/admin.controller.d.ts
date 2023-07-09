import { OutputDto } from 'src/commons/dtos';
import { AdminService } from './admin.service';
import { AdminUserCreateCrudDto, AdminUserLoginCrudDto, AdminUserOutputCrudDto, AdminUserRefreshCrudDto, AdminUserRefreshOutputCrudDto } from './dto/admin.user.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createAdminUser(payload: AdminUserCreateCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>>;
    loginAdmin(payload: AdminUserLoginCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>>;
    refreshAdmin(payload: AdminUserRefreshCrudDto): Promise<OutputDto<AdminUserRefreshOutputCrudDto>>;
}
