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
exports.AuthService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const axios_1 = require("axios");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const auth_entitiy_1 = require("./entities/auth.entitiy");
const email_service_1 = require("../email/email.service");
const jwt_1 = require("@nestjs/jwt");
const auth_phone_entitiy_1 = require("./entities/auth-phone.entitiy");
const checkElapsedTime_1 = require("../utills/checkElapsedTime");
const createRandNum = (min, max) => {
    var ntemp = Math.floor(Math.random() * (max - min + 1)) + min;
    return ntemp;
};
let AuthService = class AuthService {
    constructor(auths, authsPhone, users, emailServices, jwtService) {
        this.auths = auths;
        this.authsPhone = authsPhone;
        this.users = users;
        this.emailServices = emailServices;
        this.jwtService = jwtService;
    }
    makeSignature() {
        const NCP_accessKey = `${process.env.NCP_ACCESS_KEY}`;
        const NCP_secretKey = `${process.env.NCP_SECRET_KEY}`;
        const NCP_serviceID = `${process.env.NCP_SERVICE_ID}`;
        const space = ' ';
        const newLine = '\n';
        const method = 'POST';
        const url2 = `/sms/v2/services/${NCP_serviceID}/messages`;
        const timestamp = Date.now().toString();
        const message = [];
        const hmac = crypto.createHmac('sha256', NCP_secretKey);
        message.push(method);
        message.push(space);
        message.push(url2);
        message.push(newLine);
        message.push(timestamp);
        message.push(newLine);
        message.push(NCP_accessKey);
        const signature = hmac.update(message.join('')).digest('base64');
        return signature.toString();
    }
    async sendAuthEmail(params) {
        try {
            const { email } = params;
            const existedUsersCount = await this.users.count({
                where: {
                    email,
                },
            });
            if (existedUsersCount > 0) {
                throw new common_1.ConflictException('이미 존재하는 이메일입니다.');
            }
            const verificationCode = createRandNum(111111, 999999);
            this.emailServices.sendEmail({
                to: email,
                subject: '[메디팟] 회원 가입 이메일 인증 번호입니다.',
                html: `<h3>[메디팟] 이메일 인증 번호입니다.</h3><br/><p>인증번호: <span style="font-weight:600; color:'#2c40b7'">${verificationCode}</span></p><br/><br/><p>감사합니다.</p><br/><p>메디팟 Team</p>`,
            });
            this.auths.save(this.auths.create({
                email,
                code: verificationCode,
            }));
            return {
                statusCode: 200,
                message: '이메일 전송이 완료되었습니다.',
                data: {
                    message: '이메일 전송이 완료되었습니다.',
                },
            };
        }
        catch (e) {
            throw e;
        }
    }
    async emailValidation(params) {
        try {
            const { email, code } = params;
            const fiveMinutesAgo = new Date();
            fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
            const existedUsersCount = await this.auths.count({
                where: {
                    email,
                    code,
                    createdAt: (0, typeorm_2.MoreThanOrEqual)(fiveMinutesAgo),
                },
            });
            if (existedUsersCount > 0) {
                await this.auths.delete({
                    email,
                    code,
                });
                return {
                    statusCode: 200,
                    data: {
                        message: '인증 성공',
                    },
                };
            }
            else {
                throw new Error('인증에 실패했습니다.');
            }
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async nicknameValidation(params) {
        try {
            const { nickname } = params;
            const existedUsersCount = await this.users.count({
                where: {
                    nickname,
                },
            });
            if (existedUsersCount > 0) {
                throw new common_1.ConflictException('이미 존재하는 닉네임입니다.');
            }
            else {
                return {
                    message: '닉네임 중복 확인이 완료되었습니다.',
                    statusCode: 200,
                };
            }
        }
        catch (e) {
            throw e;
        }
    }
    async sendPhoneValidation(payload, header) {
        try {
            const { phone } = payload;
            const USERS = await this.users.find({
                where: {
                    phone,
                },
            });
            if (USERS.length > 0) {
                throw new common_1.BadRequestException('이미 인증된 휴대번호입니다.');
            }
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const USER = await this.users.findOne({
                where: {
                    no,
                },
            });
            if (!!USER.phone) {
                throw new common_1.BadRequestException('이미 휴대번호가 인증되었습니다.');
            }
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += Math.floor(Math.random() * 10);
            }
            const serviceId = `${process.env.NCP_SERVICE_ID}`;
            const accessKey = `${process.env.NCP_ACCESS_KEY}`;
            const url_ = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
            const body = {
                type: 'SMS',
                contentType: 'COMM',
                countryCode: '82',
                from: '01056922949',
                content: `[메디팟 휴대전화 인증번호] ${code}`,
                messages: [
                    {
                        to: phone,
                    },
                ],
            };
            const options = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'x-ncp-iam-access-key': accessKey,
                    'x-ncp-apigw-timestamp': Date.now().toString(),
                    'x-ncp-apigw-signature-v2': this.makeSignature(),
                },
            };
            axios_1.default
                .post(url_, body, options)
                .then(async (res) => {
                console.log(res);
            })
                .catch((err) => {
                console.log(err);
                throw new common_1.BadRequestException('잘못된 휴대번호이거나 잘못된 요청입니다.');
            });
            this.authsPhone.save(this.authsPhone.create({
                user: USER,
                code: code,
            }));
            return {
                statusCode: 200,
                data: {
                    ok: true,
                },
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException(e);
        }
    }
    async phoneValidation(payload, header) {
        try {
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const { code, phone } = payload;
            const AUTH = await this.authsPhone.findOne({
                where: {
                    code,
                    user: {
                        no,
                    },
                },
            });
            if (AUTH.code !== code) {
                throw new common_1.BadRequestException('인증번호가 틀렸습니다.');
            }
            const timeCheck = await (0, checkElapsedTime_1.checkElapsedTime)(AUTH.createdAt.toString());
            if (timeCheck) {
                throw new common_1.BadRequestException('인증시간이 5분이상 초과하였습니다.');
            }
            const USER = await this.users.findOne({
                where: {
                    no,
                },
            });
            USER.phone = phone;
            await this.users.save(USER);
            await this.authsPhone.delete(AUTH.no);
            return {
                statusCode: 200,
                data: {
                    ok: true,
                    phone,
                },
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException(e);
        }
    }
};
AuthService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(auth_entitiy_1.Auth)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_phone_entitiy_1.AuthPhone)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map