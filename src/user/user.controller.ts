import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos';
import {
  AdminUserCreateCrudDto,
  AdminUserLoginCrudDto,
  AdminUserOutputCrudDto,
  AdminUserRefreshCrudDto,
  AdminUserRefreshOutputCrudDto,
} from './dto/admin.user.dto';
import { UserCreateOutputCrudDto, UserCreateInputCrudDto } from './dto/user.dto';
import { LocalAuthenticationGuard } from './strategy/localAuthentication.guard';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/register')
  createUser(@Body() payload: UserCreateInputCrudDto): Promise<OutputDto<UserCreateOutputCrudDto>> {
    return this.usersService.createUser(payload);
  }

  @UseGuards(LocalAuthenticationGuard)
  // @UseGuards(JwtAuthGuard)
  @Post('/admin/create')
  createAdminUser(
    @Body() payload: AdminUserCreateCrudDto,
  ): Promise<OutputDto<AdminUserOutputCrudDto>> {
    return this.usersService.createAdminUser(payload);
  }

  @Post('/admin/login')
  loginAdmin(@Body() payload: AdminUserLoginCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>> {
    return this.usersService.adminLogin(payload);
  }

  @Post('/admin/refresh')
  refreshAdmin(
    @Body() payload: AdminUserRefreshCrudDto,
  ): Promise<OutputDto<AdminUserRefreshOutputCrudDto>> {
    return this.usersService.adminRefresh(payload);
  }
}
