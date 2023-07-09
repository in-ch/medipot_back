"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const admin_user_entitiy_1 = require("./entities/admin-user.entitiy");
const bcrypt = require('bcrypt');
let AdminService = class AdminService {
    constructor(adminUsers, jwtService) {
        this.adminUsers = adminUsers;
        this.jwtService = jwtService;
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('비밀번호가 틀렸습니다.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createAdminUser(payload) {
        try {
            const EXIST_USER = await this.adminUsers.findOne({
                where: {
                    id: payload.id,
                },
                select: ['password', 'id', 'token', 'refresh_token', 'name', 'no'],
            });
            if (EXIST_USER?.no) {
                throw new common_1.ConflictException('이미 존재하는 아이디입니다.');
            }
            const newAdminUser = await this.adminUsers.create({
                ...payload,
                token: ' ',
                refresh_token: ' ',
            });
            const encryptedPassowrd = bcrypt.hashSync(newAdminUser.password, 10);
            const newAdmin = await this.adminUsers.save({
                ...newAdminUser,
                password: encryptedPassowrd,
            });
            const access_token = this.jwtService.sign({
                ...newAdmin,
                token: '',
                refresh_token: '',
                password: '11',
            }, {
                expiresIn: 60 * 60,
            });
            const refresh_token = await this.jwtService.sign({
                ...newAdmin,
                token: '',
                refresh_token: '',
                password: '22',
            }, {
                expiresIn: 60 * 60 * 24,
            });
            return {
                statusCode: 200,
                data: {
                    ...newAdminUser,
                    password: encryptedPassowrd,
                    token: access_token,
                    refresh_token,
                },
            };
        }
        catch (e) {
            console.error(`create Admin User Error: ${e}`);
            throw e;
        }
    }
    async findOneAdminUser(id) {
        try {
            const adminUser = await this.adminUsers.findOne({
                where: {
                    id,
                },
            });
            return {
                statusCode: 200,
                data: adminUser,
            };
        }
        catch (e) {
            console.error(`findOneAdminUser API Error: ${e}`);
            throw e;
        }
    }
    async adminLogin(payload) {
        try {
            const { id, password } = payload;
            const adminUser = await this.adminUsers.findOne({
                where: {
                    id,
                },
                select: ['no', 'password', 'id', 'token', 'refresh_token', 'name', 'grant'],
            });
            await this.verifyPassword(password, adminUser.password);
            const access_token = await this.jwtService.sign({
                ...adminUser,
                token: '',
                refresh_token: '',
                password: '11',
            }, {
                expiresIn: 60 * 60,
            });
            const refresh_token = await this.jwtService.sign({
                ...adminUser,
                token: '',
                refresh_token: '',
                password: '22',
            }, {
                expiresIn: 60 * 60 * 24,
            });
            adminUser.token = access_token;
            adminUser.refresh_token = refresh_token;
            await this.adminUsers.save(adminUser);
            return {
                statusCode: 200,
                data: {
                    ...adminUser,
                },
            };
        }
        catch (e) {
            console.error(`adminLogin API Error: ${e}`);
            throw e;
        }
    }
    async adminRefresh(payload) {
        try {
            const { id, refresh_token } = payload;
            const verify = this.jwtService.verify(refresh_token, { secret: process.env.PRIVATE_KEY });
            if (!verify) {
                throw new common_1.NotAcceptableException(`리프레쉬 토큰이 만료되었습니다.`);
            }
            const getAdmin = await this.adminUsers.findOne({
                where: {
                    id,
                    refresh_token,
                },
                select: ['password', 'id', 'token', 'refresh_token', 'name'],
            });
            const new_access_token = await this.jwtService.sign({
                ...getAdmin,
                token: '',
                refresh_token: '',
                password: '11',
            }, {
                expiresIn: 60 * 60,
            });
            await this.adminUsers.save({
                ...getAdmin,
                token: new_access_token,
            });
            return {
                statusCode: 200,
                data: {
                    ...getAdmin,
                    token: new_access_token,
                },
            };
        }
        catch (e) {
            throw e;
        }
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_user_entitiy_1.AdminUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map