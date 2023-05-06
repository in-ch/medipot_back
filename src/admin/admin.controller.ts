import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputDto } from 'src/commons/dtos';

import { AdminService } from './admin.service';
import {
  AdminUserCreateCrudDto,
  AdminUserLoginCrudDto,
  AdminUserOutputCrudDto,
  AdminUserRefreshCrudDto,
  AdminUserRefreshOutputCrudDto,
} from './dto/admin.user.dto';
import { LocalAuthenticationGuard } from './strategy/localAuthentication.guard';

@ApiTags('어드민')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @ApiBody({ type: AdminUserCreateCrudDto })
  // @ApiCreatedResponse({ description: '성공', type: OutputDto<AdminUserOutputCrudDto> })
  // @UseGuards(LocalAuthenticationGuard)
  // @Post('/admin/create')
  // createAdminUser(
  //   @Body() payload: AdminUserCreateCrudDto,
  // ): Promise<OutputDto<AdminUserOutputCrudDto>> {
  //   return this.adminService.createAdminUser(payload);
  // }

  // @ApiBody({ type: AdminUserLoginCrudDto })
  // @ApiResponse({ description: '성공', type: OutputDto<AdminUserOutputCrudDto> })
  // @Post('/admin/login')
  // loginAdmin(@Body() payload: AdminUserLoginCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>> {
  //   return this.adminService.adminLogin(payload);
  // }

  // @ApiBody({ type: AdminUserRefreshCrudDto })
  // @ApiResponse({ description: '성공', type: OutputDto<AdminUserRefreshOutputCrudDto> })
  // @Post('/admin/refresh')
  // refreshAdmin(
  //   @Body() payload: AdminUserRefreshCrudDto,
  // ): Promise<OutputDto<AdminUserRefreshOutputCrudDto>> {
  //   return this.adminService.adminRefresh(payload);
  // }
}
