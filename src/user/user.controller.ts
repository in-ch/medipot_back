import { Body, Controller, Delete, Get, Headers, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AdminGuard } from 'src/admin/strategy/grant.strategy';

import { GetListParams, OutputDto } from 'src/commons/dtos';
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
  RefreshOutputDto,
  GetUserGrantHeader,
  RequestGrantCrudDto,
  RequestGrantHeaderDto,
  UpdateUserGrantBodyDto,
  UserGrantRequestListPagination,
  RequestDepartmentHeaderDto,
  DeleteUserHeader,
  GetPhoneNumResponseDto,
  GetPhoneNumRequestParamDto,
} from './dto/user.dto';
import { UserGrantRequest } from './entities/doctorGrant.entitiy';
import { DEPARTMENT, User, UserGrant } from './entities/user.entitiy';
import { JwtAuthGuard } from './strategy/jwtAuthentication.guard';
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

  @ApiBody({ type: UserLoginCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<UserLoginOutputCrudDto> })
  @Post('/login')
  login(@Body() payload: UserLoginCrudDto): Promise<OutputDto<UserLoginOutputCrudDto>> {
    return this.usersService.login(payload);
  }

  @ApiBody({ type: GetListParams })
  @ApiResponse({ description: '성공', type: OutputDto<User[]> })
  @Get('/list')
  getList(@Req() request: Request<GetListParams>): Promise<OutputDto<User[]>> {
    return this.usersService.getList(request);
  }

  @ApiBody({})
  @ApiResponse({ description: '성공', type: OutputDto<MeOutputCrudDto> })
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  me(@Headers() header: MeInputDto): Promise<OutputDto<MeOutputCrudDto>> {
    return this.usersService.me(header);
  }

  @ApiBody({ type: UpdateProfileCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  @UseGuards(JwtAuthGuard)
  @Post('/profile/update')
  updateProfile(
    @Body() payload: UpdateProfileCrudDto,
    @Headers() header: UpdateProfileHeaderDto,
  ): Promise<OutputDto<UpdateProfileOutputDto>> {
    return this.usersService.updateProfile(payload, header);
  }

  @ApiBody({ type: RequestGrantCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  @UseGuards(JwtAuthGuard)
  @Put('/profile/grant')
  requestGrant(
    @Body() payload: RequestGrantCrudDto,
    @Headers() header: RequestGrantHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.usersService.requestGrant(payload, header);
  }

  @ApiBody({ type: RequestGrantCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<UserGrantRequest[]> })
  @Get('/grant/list')
  getGrants(
    @Req() request: Request<UserGrantRequestListPagination>,
  ): Promise<OutputDto<UserGrantRequest[]>> {
    return this.usersService.getGrants(request);
  }

  @ApiBody({ type: RequestDepartmentHeaderDto })
  @ApiResponse({ description: '성공', type: OutputDto<DEPARTMENT> })
  @UseGuards(JwtAuthGuard)
  @Get('/department')
  getDepartment(@Headers() header: RequestDepartmentHeaderDto): Promise<OutputDto<DEPARTMENT>> {
    return this.usersService.getDepartment(header);
  }

  @ApiBody({ type: Boolean })
  @ApiResponse({ description: '성공', type: OutputDto<UpdateProfileOutputDto> })
  @UseGuards(AdminGuard)
  @Put('/profile/grant/update')
  updateUserGrant(@Body() payload: UpdateUserGrantBodyDto): Promise<OutputDto<boolean>> {
    return this.usersService.updateUserGrant(payload);
  }

  @ApiBody({ type: RefreshParams })
  @ApiResponse({ description: '성공', type: OutputDto<RefreshOutputDto> })
  @Post('/refresh')
  refresh(@Body() payload: RefreshParams): Promise<OutputDto<RefreshOutputDto>> {
    return this.usersService.refresh(payload);
  }

  @ApiBody({ type: SearchUserCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<User> })
  @UseGuards(JwtAuthGuard)
  @Get('/search')
  searchUser(@Req() request: Request<SearchUserCrudDto>): Promise<OutputDto<User>> {
    return this.usersService.searchUser(request);
  }

  @ApiBody({ type: SearchUserCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<User> })
  @UseGuards(JwtAuthGuard)
  @Get('/grant')
  getUserGrant(@Headers() header: GetUserGrantHeader): Promise<OutputDto<UserGrant>> {
    return this.usersService.getUserGrant(header);
  }

  @ApiBody({ type: DeleteUserHeader })
  @ApiResponse({ description: '성공', type: OutputDto<User> })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  DeleteUser(@Headers() header: DeleteUserHeader): Promise<OutputDto<User>> {
    return this.usersService.deleteUser(header);
  }

  @ApiBody({ type: GetPhoneNumRequestParamDto })
  @ApiResponse({ description: '성공', type: OutputDto<GetPhoneNumResponseDto> })
  @UseGuards(JwtAuthGuard)
  @Get('/getPhoneNum')
  getPhoneNum(
    @Req() request: Request<GetPhoneNumRequestParamDto>,
  ): Promise<OutputDto<GetPhoneNumResponseDto>> {
    return this.usersService.getPhoneNum(request);
  }
}
