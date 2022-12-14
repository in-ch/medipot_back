import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminUserCreateCrudDto, AdminUserLoginCrudDto, AdminUserOutputCrudDto } from './dto/admin.user.dto';
import { OutputDto } from 'src/commons/dtos';
import { AdminUser } from './entities/user.entitiy';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt'); // 패스워드 암호화 

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(AdminUser) private readonly adminUsers: Repository<AdminUser>,
        private readonly jwtService: JwtService,
    ) {}


    /**
     * @param {string} plainTextPassword 비밀번호
     * @param {string} plainTextPassword 암호화된 비밀번호
     * @description 암호화된 비밀번호와 비밀번호를 비교한다.
     * @return {void | Error} 암호 비교 결과
     * @author in-ch, 2022-12-12
    */
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
        }
      }

    /**
     * @param {AdminUserCreateCrudDto} payload 생성할 유저 정보
     * @description 어드민 유저를 생성한다.
     * @return {OutputDto<AdminUserOutputCrudDto>}
     * @author in-ch, 2022-12-12
    */
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

    /**
     * @param {string} id 유저의 아이디
     * @description 이름으로 유저 정보를 가져온다.
     * @return {OutputDto<AdminUserOutputCrudDto>}
     * @author in-ch, 2022-12-12
    */
    async findOneAdminUser(id: string): Promise<OutputDto<AdminUserOutputCrudDto>>{
        try{
            const adminUser =  await this.adminUsers.findOne({
                where:{
                    id,
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

    /**
     * @param {string} id 아이디
     * @param {string} password 비밀번호
     * @description 아이디와 비밀번호 어드민 로그인을 한다.
     * @return {OutputDto<AdminUserOutputCrudDto>}
     * @author in-ch, 2022-12-12
    */
    async adminLogin(payload:AdminUserLoginCrudDto):Promise<OutputDto<AdminUserOutputCrudDto>> {
        try{
            const {id, password} = payload;
            const adminUser = await this.adminUsers.findOne({
                where:{
                    id
                }
            });
            await this.verifyPassword(password, adminUser.password);
            const access_token = this.jwtService.sign({
                ...adminUser,
                password: '11',
            });

            const refresh_token = this.jwtService.sign({
                ...adminUser,
                password: '22',
            });

            return {
                isDone: true,
                status: 200,
                data: {
                    ...adminUser,
                    token: access_token,
                    refresh_token: refresh_token,
                }
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