import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminUserCreateCrudDto, AdminUserOutputCrudDto } from './dto/admin.user.dto';
import { OutputDto } from 'src/commons/dtos';
import { AdminUser } from './entities/user.entitiy';

const bcrypt = require('bcrypt'); // 패스워드 암호화 

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(AdminUser) private readonly adminUsers: Repository<AdminUser>,
    ) {}

    async createAdminUser(payload: AdminUserCreateCrudDto): Promise<OutputDto<AdminUserOutputCrudDto>> {
        try{
            const newAdminUser = this.adminUsers.create(payload);
            const encryptedPassowrd = bcrypt.hashSync(newAdminUser.password, 10) 
            this.adminUsers.save({
                ...newAdminUser,
                password: encryptedPassowrd,
            });
            return {
                isDone: true,
                status: 200,
                data: {
                    ...newAdminUser,
                    password: encryptedPassowrd,
                },
            }
        } catch(e){
            return {
                isDone: false,
                status: 201,
                error: e,
            }
        }
    }

    async findOneAdminUser(name: string): Promise<OutputDto<AdminUserOutputCrudDto>>{
        try{
            const adminUser =  await this.adminUsers.findOne({
                where:{
                    name,
                }
            });
            return {
                isDone: true,
                status: 200,
                data: adminUser
            }
        } catch(e){
            return {
                isDone: false,
                status: 201,
                error: e,
            }
        }
    }
}