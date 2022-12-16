import { Body, Controller, Post, UseGuards} from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos';
import { AdminUserCreateCrudDto, AdminUserCrudDto, AdminUserLoginCrudDto, AdminUserOutputCrudDto, AdminUserRefreshCrudDto, AdminUserRefreshOutputCrudDto } from './dto/admin.user.dto';
import { JwtAuthGuard } from './strategy/jwtAuthentication.guard';
import { LocalAuthenticationGuard } from './strategy/localAuthentication.guard';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService){}

    @UseGuards(LocalAuthenticationGuard)
    // @UseGuards(JwtAuthGuard)
    @Post("/admin/create")
    createAdminUser(
        @Body() payload: AdminUserCreateCrudDto
    ): Promise<OutputDto<AdminUserOutputCrudDto>> {
        console.log(payload);
        return this.usersService.createAdminUser(payload);
    }

    @Post("/admin/login")
    loginAdmin(
    @Body() payload: AdminUserLoginCrudDto
    ): Promise<OutputDto<AdminUserOutputCrudDto>> {
        return this.usersService.adminLogin(payload);
    }

    @Post("/admin/refresh")
    refreshAdmin(
    @Body() payload: AdminUserRefreshCrudDto
    ): Promise<OutputDto<AdminUserRefreshOutputCrudDto>> {
        return this.usersService.adminRefresh(payload);
    }
}
