import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { UserCreateOutputCrudDto, UserCreateInputCrudDto, UserLoginCrudDto, UserLoginOutputCrudDto, MeInputDto, MeOutputCrudDto, UpdateProfileCrudDto, UpdateProfileHeaderDto, UpdateProfileOutputDto, SearchUserCrudDto, RefreshParams, RefreshOutputDto, GetUserGrantHeader, RequestGrantCrudDto, RequestGrantHeaderDto, UpdateUserGrantBodyDto, UserGrantRequestListPagination, RequestDepartmentHeaderDto } from './dto/user.dto';
import { UserGrantRequest } from './entities/doctorGrant.entitiy';
import { DEPARTMENT, User, UserGrant } from './entities/user.entitiy';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    createUser(payload: UserCreateInputCrudDto): Promise<OutputDto<UserCreateOutputCrudDto>>;
    login(payload: UserLoginCrudDto): Promise<OutputDto<UserLoginOutputCrudDto>>;
    me(header: MeInputDto): Promise<OutputDto<MeOutputCrudDto>>;
    updateProfile(payload: UpdateProfileCrudDto, header: UpdateProfileHeaderDto): Promise<OutputDto<UpdateProfileOutputDto>>;
    requestGrant(payload: RequestGrantCrudDto, header: RequestGrantHeaderDto): Promise<OutputDto<boolean>>;
    getGrants(request: Request<UserGrantRequestListPagination>): Promise<OutputDto<UserGrantRequest[]>>;
    getDepartment(header: RequestDepartmentHeaderDto): Promise<OutputDto<DEPARTMENT>>;
    updateUserGrant(payload: UpdateUserGrantBodyDto): Promise<OutputDto<boolean>>;
    refresh(payload: RefreshParams): Promise<OutputDto<RefreshOutputDto>>;
    searchUser(request: Request<SearchUserCrudDto>): Promise<OutputDto<User>>;
    getUserGrant(header: GetUserGrantHeader): Promise<OutputDto<UserGrant>>;
}
