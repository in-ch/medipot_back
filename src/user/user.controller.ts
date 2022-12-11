import { Body, Controller, Post} from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos';
import { AdminUserCreateCrudDto, AdminUserOutputCrudDto } from './dto/admin.user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService){}

    @Post("/admin/create")
    createAdminUser(
        @Body() payload: AdminUserCreateCrudDto
    ): Promise<OutputDto<AdminUserOutputCrudDto>> {
        return this.usersService.createAdminUser(payload);
    }
}
