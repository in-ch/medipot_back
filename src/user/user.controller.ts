import { Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OutputDto } from 'src/commons/dtos';
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
} from './dto/user.dto';
import { User, UserGrant } from './entities/user.entitiy';
import { GrantGuard } from './strategy/grant.strategy';
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

  @ApiBody({})
  @ApiResponse({ description: '성공', type: OutputDto<MeOutputCrudDto> })
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  me(@Headers() header: MeInputDto): Promise<OutputDto<MeOutputCrudDto>> {
    return this.usersService.me(header);
  }

  @ApiBody({ type: UpdateProfileCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<UpdateProfileOutputDto> })
  @UseGuards(JwtAuthGuard)
  @Post('/profile/update')
  updateProfile(
    @Body() payload: UpdateProfileCrudDto,
    @Headers() header: UpdateProfileHeaderDto,
  ): Promise<OutputDto<UpdateProfileOutputDto>> {
    return this.usersService.updateProfile(payload, header);
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
  @UseGuards(JwtAuthGuard, GrantGuard)
  @Get('/grant')
  getUserGrant(@Headers() header: GetUserGrantHeader): Promise<OutputDto<UserGrant>> {
    return this.usersService.getUserGrant(header);
  }
}
