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
exports.KakaoService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const rxjs_1 = require("rxjs");
const faker_1 = require("@faker-js/faker");
const dtos_1 = require("../commons/dtos");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const faker = new faker_1.Faker({
    locale: [faker_1.ko],
});
let KakaoService = class KakaoService {
    constructor(users, httpService, jwtService) {
        this.users = users;
        this.httpService = httpService;
        this.jwtService = jwtService;
    }
    async me(header) {
        try {
            const { authorization } = header;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
                .get(`${process.env.KAKAO_API}/v2/user/me`, {
                headers: {
                    ContentType: 'application/x-www-form-urlencoded',
                    Authorization: `${authorization}`,
                },
            })
                .pipe((0, rxjs_1.catchError)((error) => {
                throw error;
            })));
            return {
                statusCode: 200,
                data,
            };
        }
        catch (e) {
            console.error(`kakao me error:  ${e}`);
            throw e;
        }
    }
    async refresh(payload) {
        try {
            const { refresh_token } = payload;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
                .post(`${process.env.KAKAO_API_REFRESH}/oauth/token?grant_type=refresh_token&client_id=${process.env.KAKAO_API_KEY}&refresh_token=${refresh_token}`, {
                headers: {
                    ContentType: 'multipart/form-data',
                },
            })
                .pipe((0, rxjs_1.catchError)((error) => {
                console.error(error);
                throw error;
            })));
            return {
                statusCode: 200,
                data,
            };
        }
        catch (e) {
            console.error(`kakao refresh error:  ${e}`);
            throw e;
        }
    }
    async logout(header) {
        try {
            const { authorization } = header;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
                .post(`${process.env.KAKAO_API}/v1/user/logout`, {}, {
                headers: {
                    ContentType: 'application/x-www-form-urlencoded',
                    Authorization: `${authorization}`,
                },
            })
                .pipe((0, rxjs_1.catchError)((error) => {
                console.error(error);
                throw error;
            })));
            return {
                statusCode: 200,
                data,
            };
        }
        catch (e) {
            console.error(`kakao logout error:  ${e}`);
            throw e;
        }
    }
    async kakaoLogin(params) {
        try {
            const { authorization } = params;
            const results = await this.me({
                authorization: `Bearer ${authorization}`,
            });
            const { data: { kakao_account: { profile: { nickname, thumbnail_image_url }, email, }, }, } = results;
            const User = await this.users.findOne({
                where: {
                    email,
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
                const NewUser = await this.users.create({
                    email,
                    password: '#!@$!ASAFAZXCVASDG!@$!@$!@%!@%!@$!@#SFSERQDAFASDGAS!@%!YGBXCV',
                    nickname: faker.internet.userName({ firstName: 'unknown' }),
                    profile: thumbnail_image_url,
                    isSocialLogin: true,
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
                        email: (await NewUser).email,
                        nickname: (await NewUser).nickname,
                        password: '1',
                        marketingConsent: (await NewUser).marketingConsent,
                        token: access_token,
                        refresh_token,
                    },
                };
            }
        }
        catch (e) {
            console.error(`kakao login error: ${e}`);
            throw e;
        }
    }
};
KakaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        jwt_1.JwtService])
], KakaoService);
exports.KakaoService = KakaoService;
//# sourceMappingURL=kakao.service.js.map