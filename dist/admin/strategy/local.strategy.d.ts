import { OutputDto } from 'src/commons/dtos';
import { AdminService } from '../admin.service';
import { AdminUserOutputCrudDto } from '../dto/admin.user.dto';
import { ConfigService } from '@nestjs/config';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly adminService;
    constructor(adminService: AdminService, configService: ConfigService);
    validate(id: string, password: string): Promise<OutputDto<AdminUserOutputCrudDto>>;
}
export {};
