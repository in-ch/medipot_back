import { Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

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
  SearchUserCrudDto,
  RefreshParams,
  RefreshHeader,
  RefreshOutputDto,
} from './dto/user.dto';
import { User } from './entities/user.entitiy';
import { JwtAuthGuard } from './strategy/jwtAuthentication.guard';
import { LocalAuthenticationGuard } from './strategy/localAuthentication.guard';

import { UserService } from './user.service';

@ApiTags('유저')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiBody({ type: UserCreateInputCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<UserCreateOutputCrudDto> })
  @Post('/register')
  createUser(@Body() payload: UserCreateInputCrudDto): Promise<OutputDto<UserCreateOutputCrudDto>> {
    return this.usersService.createUser(payload);
  }

  @ApiBody({ type: AdminUserCreateCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<AdminUserOutputCrudDto> })
  @UseGuards(LocalAuthenticationGuard)
  // @UseGuards(JwtAuthGuard)
  @Post('/admin/create')
  createAdminUser(
    @Body() payload: AdminUserCreateCrudDto,
  ): Promise<OutputDto<AdminUserOutputCrudDto>> {
    return this.usersService.createAdminUser(payload);
  }

  @ApiBody({ type: UserLoginCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<UserLoginOutputCrudDto> })
  @Post('/login')
  login(@Body() payload: UserLoginCrudDto): Promise<OutputDto<UserLoginOutputCrudDto>> {
    return this.usersService.login(payload);
  }

  @ApiBody({ type: AdminUserLoginCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<AdminUserOutputCrudDto> })
  @Post('/admin/login')
  loginAdmin(@Body() payload: AdminUserLoginCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>> {
    return this.usersService.adminLogin(payload);
  }

  @ApiBody({ type: AdminUserRefreshCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<AdminUserRefreshOutputCrudDto> })
  @Post('/admin/refresh')
  refreshAdmin(
    @Body() payload: AdminUserRefreshCrudDto,
  ): Promise<OutputDto<AdminUserRefreshOutputCrudDto>> {
    return this.usersService.adminRefresh(payload);
  }

  @ApiBody({})
  @ApiCreatedResponse({ description: '성공', type: OutputDto<MeOutputCrudDto> })
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  me(@Headers() header: MeInputDto): Promise<OutputDto<MeOutputCrudDto>> {
    return this.usersService.me(header);
  }

  @ApiBody({ type: UpdateProfileCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<UpdateProfileOutputDto> })
  @UseGuards(JwtAuthGuard)
  @Post('/profile/update')
  updateProfile(
    @Body() payload: UpdateProfileCrudDto,
    @Headers() header: UpdateProfileHeaderDto,
  ): Promise<OutputDto<UpdateProfileOutputDto>> {
    return this.usersService.updateProfile(payload, header);
  }

  @ApiBody({ type: RefreshParams })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<RefreshOutputDto> })
  @Post('/refresh')
  refresh(@Body() payload: RefreshParams): Promise<OutputDto<RefreshOutputDto>> {
    return this.usersService.refresh(payload);
  }

  @ApiBody({ type: SearchUserCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<User> })
  @UseGuards(JwtAuthGuard)
  @Get('/search')
  searchUser(@Req() request: Request<SearchUserCrudDto>): Promise<OutputDto<User>> {
    return this.usersService.searchUser(request);
  }
}
