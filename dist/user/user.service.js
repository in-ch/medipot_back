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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const jwt_1 = require("@nestjs/jwt");
const user_entitiy_1 = require("./entities/user.entitiy");
const doctorGrant_entitiy_1 = require("./entities/doctorGrant.entitiy");
const notion_service_1 = require("../utills/notion/notion.service");
const faker = new faker_1.Faker({
    locale: [faker_1.ko],
});
const bcrypt = require('bcrypt');
let UserService = class UserService {
    constructor(users, userGrantRequests, jwtService, notionService) {
        this.users = users;
        this.userGrantRequests = userGrantRequests;
        this.jwtService = jwtService;
        this.notionService = notionService;
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('비밀번호가 틀렸습니다.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createUser(payload) {
        try {
            const newUserData = this.users.create({
                ...payload,
                nickname: faker.internet.userName({ firstName: 'unknown' }),
            });
            const encryptedPassowrd = bcrypt.hashSync(newUserData.password, 10);
            const newUser = await this.users.save({
                ...newUserData,
                password: encryptedPassowrd,
            });
            const access_token = await this.jwtService.sign({
                ...newUser,
                password: '11',
            }, {
                expiresIn: 60 * 60,
            });
            const refresh_token = await this.jwtService.sign({
                ...newUser,
                password: '11',
            }, {
                expiresIn: 60 * 60 * 24,
            });
            newUser.token = access_token;
            newUser.refresh_token = refresh_token;
            await this.users.save(newUser);
            return {
                statusCode: 200,
                data: {
                    email: (await newUser).email,
                    nickname: (await newUser).nickname,
                    password: encryptedPassowrd,
                    marketingConsent: (await newUser).marketingConsent,
                    access_token: access_token,
                    refresh_token,
                },
            };
        }
        catch (e) {
            console.error(`createUser API Error: ${e}`);
            throw e;
        }
    }
    async findOneUser(id) {
        try {
            const User = await this.users.findOne({
                where: {
                    no: Number(id),
                },
            });
            return {
                statusCode: 200,
                data: User,
            };
        }
        catch (e) {
            console.error(`findOneUser Error: ${e}`);
        }
    }
    async login(payload) {
        try {
            const { email, password } = payload;
            const user = await this.users.findOne({
                where: {
                    email,
                    isSocialLogin: false,
                },
                select: ['password', 'email', 'token', 'refresh_token', 'nickname', 'profile', 'no'],
            });
            await this.verifyPassword(password, user.password);
            const access_token = await this.jwtService.sign({
                ...user,
                token: '',
                refresh_token: '',
            }, {
                expiresIn: 60 * 60,
            });
            const refresh_token = await this.jwtService.sign({
                ...user,
                token: '',
                refresh_token: '',
            }, {
                expiresIn: 60 * 60 * 24 * 7,
            });
            user.token = await access_token;
            user.refresh_token = await refresh_token;
            await this.users.save(user);
            return {
                statusCode: 200,
                data: {
                    ...user,
                    token: access_token,
                    refresh_token,
                },
            };
        }
        catch (e) {
            console.error(`Login API Error: ${e}`);
            throw e;
        }
    }
    async refresh(payload) {
        try {
            const { no, refresh_token } = payload;
            const USER = await this.users.findOne({
                where: {
                    no,
                },
                select: ['password', 'email', 'token', 'refresh_token', 'nickname', 'profile', 'no'],
            });
            if (USER.refresh_token !== refresh_token) {
                throw new common_1.BadRequestException('리프레쉬 토큰이 변조되었습니다.');
            }
            const verify = await this.jwtService.verify(refresh_token, {
                secret: process.env.PRIVATE_KEY,
            });
            if (!verify) {
                throw new common_1.NotAcceptableException(`리프레쉬 토큰이 만료되었습니다.`);
            }
            else {
                const access_token = await this.jwtService.sign({
                    ...USER,
                    token: '',
                    refresh_token: '',
                }, {
                    expiresIn: 60 * 60,
                });
                USER.token = await access_token;
                await this.users.save(USER);
                return {
                    statusCode: 200,
                    data: {
                        authorization: access_token,
                    },
                };
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async me(header) {
        try {
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const User = await this.users.findOne({
                where: {
                    no: UnSignToken.no,
                },
                select: ['no', 'profile', 'nickname', 'phone'],
            });
            return {
                statusCode: 200,
                data: User,
            };
        }
        catch (e) {
            console.error(`me API Error: ${e}`);
            throw e;
        }
    }
    async updateProfile(payload, header) {
        try {
            const { authorization } = header;
            const { profile, nickname, department } = payload;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const User = await this.users.findOne({
                where: {
                    no: UnSignToken.no,
                },
            });
            User.nickname = nickname ? nickname : User.nickname;
            User.profile = profile ? profile : User.profile;
            User.department = department ? department : User.department;
            await this.users.save(User);
            return {
                statusCode: 200,
                data: User,
            };
        }
        catch (e) {
            console.error(`updateProfile API Error: ${e}`);
            throw e;
        }
    }
    async searchUser(request) {
        try {
            const { query: { no }, } = request;
            const User = await this.users.findOne({
                where: {
                    no: Number(no),
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            return {
                statusCode: 200,
                data: User,
            };
        }
        catch (e) {
            console.error(`searchUser API Error: ${e}`);
            throw new common_1.BadRequestException('유저가 존재하지 않습니다.');
        }
    }
    async getUserGrant(header) {
        try {
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const User = await this.users.findOne({
                where: {
                    no: UnSignToken.no,
                },
                select: ['grant'],
            });
            return {
                statusCode: 200,
                data: User.grant,
            };
        }
        catch (e) {
            console.error(`getUserGrant API Error: ${e}`);
            throw new common_1.BadRequestException('유저 grant 정보를 가져오는데 실패했습니다..');
        }
    }
    async getDepartment(header) {
        try {
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const User = await this.users.findOne({
                where: {
                    no: UnSignToken.no,
                },
                select: ['department'],
            });
            return {
                statusCode: 200,
                data: User.department,
            };
        }
        catch (e) {
            console.error(`getDepartment API Error: ${e}`);
            throw new common_1.BadRequestException('유저 department 정보를 가져오는데 실패했습니다..');
        }
    }
    async requestGrant(payload, header) {
        try {
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const User = await this.users.findOne({
                where: {
                    no: UnSignToken.no,
                },
                select: ['grant', 'no', 'nickname'],
            });
            if (User.grant === user_entitiy_1.UserGrant.DOCTOR)
                throw new common_1.BadRequestException('이미 의사 권한을 가지고 있습니다.');
            const existedUserGrant = await this.userGrantRequests.findOne({
                where: {
                    user: {
                        no: User?.no,
                    },
                },
            });
            if (!!existedUserGrant?.no)
                return {
                    statusCode: 409,
                    data: false,
                };
            await this.userGrantRequests.create(await this.userGrantRequests.save({
                user: User,
                license: payload.license,
            }));
            this.notionService.notionRequestGrant({
                name: User.nickname,
                license: payload.license,
            });
            return {
                statusCode: 200,
                data: true,
            };
        }
        catch (e) {
            console.error(`requestGrant API Error: ${e}`);
            throw new common_1.BadRequestException(`requestGrant API Error: ${e}`);
        }
    }
    async updateUserGrant(payload) {
        try {
            const { userNo, grant } = payload;
            const User = await this.users.findOne({
                where: {
                    no: userNo,
                },
                select: ['grant', 'no'],
            });
            User.grant = grant;
            this.users.save(User);
            this.userGrantRequests.delete({
                user: {
                    no: User.no,
                },
            });
            return {
                statusCode: 200,
                data: true,
            };
        }
        catch (e) {
            console.error(`updateUserGrant API Error: ${e}`);
            throw new common_1.BadRequestException(`updateUserGrant API Error: ${e}`);
        }
    }
    async getGrants(request) {
        try {
            const { query: { limit, page }, } = request;
            const userGrantRequests = await this.userGrantRequests.find({
                take: Number(limit) || 10,
                skip: Number(page) * Number(limit) || 0,
                where: {
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
                relations: ['user'],
            });
            const totalCount = await this.userGrantRequests.count({
                where: {
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            return {
                statusCode: 200,
                totalCount,
                data: userGrantRequests,
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException('유저의 의사 권한 요청 리스트를 가져오는데 실패하였습니다.');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getGrants", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(doctorGrant_entitiy_1.UserGrantRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        notion_service_1.NotionService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map