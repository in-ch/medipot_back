import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos';
import { Repository } from 'typeorm';
import { AdminUserCreateCrudDto, AdminUserOutputCrudDto } from './dto/admin.user.dto';

import { AdminUser } from './entities/user.entitiy';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(AdminUser) private readonly adminUsers: Repository<AdminUser>,
    ) {}

    async createAdminUser(payload: AdminUserCreateCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>> {
        try{
            const newAdminUser = this.adminUsers.create(payload);
            this.adminUsers.save(newAdminUser);
            return {
                isDone: true,
                status: 200,
                data: newAdminUser,
            }
        } catch(e){
            return {
                isDone: false,
                status: 201,
                error: '오류가 발생하였습니다.',
            }
        }
    }
}
