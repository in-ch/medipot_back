import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';

import { OutputDto } from 'src/commons/dtos';
import {
  AdminUserCreateCrudDto,
  AdminUserLoginCrudDto,
  AdminUserOutputCrudDto,
  AdminUserRefreshCrudDto,
  AdminUserRefreshOutputCrudDto,
} from './dto/admin.user.dto';
import {
  UserCreateOutputCrudDto,
  UserCreateInputCrudDto,
  UserLoginCrudDto,
  UserLoginOutputCrudDto,
  MeInputDto,
  MeOutputCrudDto,
  UpdateProfileCrudDto,
  UpdateProfileHeaderDto,
  UpdateProfileOutputDto,
} from './dto/user.dto';
import { JwtAuthGuard } from './strategy/jwtAuthentication.guard';
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

  @Post('/login')
  login(@Body() payload: UserLoginCrudDto): Promise<OutputDto<UserLoginOutputCrudDto>> {
    return this.usersService.login(payload);
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

  @UseGuards(JwtAuthGuard)
  @Post('/me')
  me(@Headers() header: MeInputDto): Promise<OutputDto<MeOutputCrudDto>> {
    return this.usersService.me(header);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/profile/update')
  updateProfile(
    @Body() payload: UpdateProfileCrudDto,
    @Headers() header: UpdateProfileHeaderDto,
  ): Promise<OutputDto<UpdateProfileOutputDto>> {
    return this.usersService.updateProfile(payload, header);
  }
}
