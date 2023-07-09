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
exports.NaverService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const faker_1 = require("@faker-js/faker");
const typeorm_2 = require("typeorm");
const dtos_1 = require("../commons/dtos");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const faker = new faker_1.Faker({
    locale: [faker_1.ko],
});
let NaverService = class NaverService {
    constructor(users, httpService, jwtService) {
        this.users = users;
        this.httpService = httpService;
        this.jwtService = jwtService;
    }
    async me(payload) {
        try {
            const { accessToken } = payload;
            const { data: { response }, } = await (0, rxjs_1.firstValueFrom)(this.httpService
                .get(`${process.env.NAVER_API}/me`, {
                headers: {
                    ContentType: 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .pipe((0, rxjs_1.catchError)((error) => {
                throw error;
            })));
            const User = await this.users.findOne({
                where: {
                    email: response.email,
                    isSocialLogin: true,
                },
            });
            if (Number(User?.no) > 0) {
                const access_token = await this.jwtService.sign({
                    ...User,
                    token: '',
                    refresh_token: '',
                    password: '11',
                }, {
                    expiresIn: 1000 * 60 * 60 * 30,
                });
                const refresh_token = await this.jwtService.sign({
                    ...User,
                    token: '',
                    refresh_token: '',
                    password: '22',
                }, {
                    expiresIn: 1000 * 60 * 60 * 60 * 24,
                });
                User.token = access_token;
                User.refresh_token = refresh_token;
                await this.users.save(User);
                return {
                    statusCode: 200,
                    type: dtos_1.LOGIN_REGISTER_TYPE.login,
                    data: {
                        ...User,
                        token: access_token,
                        refresh_token,
                    },
                };
            }
            else {
                const { email, name, profile_image, mobile } = await response;
                const NewUser = await this.users.create({
                    email,
                    nickname: faker.internet.userName({ firstName: 'unknown' }),
                    profile: profile_image,
                    isSocialLogin: true,
                    phone: mobile.replaceAll('-', ''),
                    password: '#!@$!ASAFAZXCVASDG',
                });
                await this.users.save(NewUser);
                const access_token = await this.jwtService.sign({
                    ...NewUser,
                    password: '11',
                }, {
                    expiresIn: 1000 * 60 * 60 * 30,
                });
                const refresh_token = this.jwtService.sign({
                    ...NewUser,
                    password: '11',
                }, {
                    expiresIn: 1000 * 60 * 60 * 60 * 24,
                });
                NewUser.token = access_token;
                NewUser.refresh_token = refresh_token;
                await this.users.save(NewUser);
                return {
                    statusCode: 200,
                    type: dtos_1.LOGIN_REGISTER_TYPE.register,
                    data: {
                        email: NewUser.email,
                        nickname: NewUser.nickname,
                        password: '1',
                        marketingConsent: NewUser.marketingConsent,
                        token: access_token,
                        refresh_token,
                    },
                };
            }
        }
        catch (e) {
            console.error(`kakao me error:  ${e}`);
            throw e;
        }
    }
};
NaverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        jwt_1.JwtService])
], NaverService);
exports.NaverService = NaverService;
//# sourceMappingURL=naver.service.js.map