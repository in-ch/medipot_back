import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { OutputDto } from 'src/commons/dtos';
import { DEPARTMENT, User, UserGrant } from './entities/user.entitiy';
import { GetUserGrantHeader, MeInputDto, MeOutputCrudDto, RefreshOutputDto, RefreshParams, RequestDepartmentHeaderDto, RequestGrantCrudDto, RequestGrantHeaderDto, SearchUserCrudDto, UpdateProfileCrudDto, UpdateProfileHeaderDto, UpdateProfileOutputDto, UpdateUserGrantBodyDto, UserCreateInputCrudDto, UserCreateOutputCrudDto, UserGrantRequestListPagination, UserLoginCrudDto, UserLoginOutputCrudDto } from './dto/user.dto';
import { Request } from 'express';
import { UserGrantRequest } from './entities/doctorGrant.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';
export declare class UserService {
    private readonly users;
    private readonly userGrantRequests;
    private readonly jwtService;
    private readonly notionService;
    constructor(users: Repository<User>, userGrantRequests: Repository<UserGrantRequest>, jwtService: JwtService, notionService: NotionService);
    private verifyPassword;
    createUser(payload: UserCreateInputCrudDto): Promise<OutputDto<UserCreateOutputCrudDto>>;
    findOneUser(id: string): Promise<OutputDto<UserLoginOutputCrudDto>>;
    login(payload: UserLoginCrudDto): Promise<OutputDto<UserLoginOutputCrudDto>>;
    refresh(payload: RefreshParams): Promise<OutputDto<RefreshOutputDto>>;
    me(header: MeInputDto): Promise<OutputDto<MeOutputCrudDto>>;
    updateProfile(payload: UpdateProfileCrudDto, header: UpdateProfileHeaderDto): Promise<OutputDto<UpdateProfileOutputDto>>;
    searchUser(request: Request<SearchUserCrudDto>): Promise<OutputDto<User>>;
    getUserGrant(header: GetUserGrantHeader): Promise<OutputDto<UserGrant>>;
    getDepartment(header: RequestDepartmentHeaderDto): Promise<OutputDto<DEPARTMENT>>;
    requestGrant(payload: RequestGrantCrudDto, header: RequestGrantHeaderDto): Promise<OutputDto<boolean>>;
    updateUserGrant(payload: UpdateUserGrantBodyDto): Promise<OutputDto<boolean>>;
    getGrants(request: Request<UserGrantRequestListPagination>): Promise<OutputDto<UserGrantRequest[]>>;
}
