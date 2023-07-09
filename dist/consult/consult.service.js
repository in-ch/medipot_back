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
exports.ConsultService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const notion_service_1 = require("../utills/notion/notion.service");
const consult_entitiy_1 = require("./entities/consult.entitiy");
let ConsultService = class ConsultService {
    constructor(consults, users, jwtService, notionService) {
        this.consults = consults;
        this.users = users;
        this.jwtService = jwtService;
        this.notionService = notionService;
    }
    async list(query, header) {
        try {
            const { page, limit } = query;
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const consults = await this.consults.find({
                take: limit || 10,
                skip: page * limit || 0,
                where: {
                    user: {
                        no,
                    },
                },
                relations: ['user'],
                loadRelationIds: true,
            });
            const totalCount = consults.length;
            return {
                totalCount,
                statusCode: 200,
                data: consults,
            };
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async sendConsultAdd(params, header) {
        try {
            const { name, phone, type } = params;
            const { authorization } = header;
            const CONSULT = await this.consults.findOne({
                where: {
                    name,
                    phone,
                    type,
                    isDone: false,
                },
            });
            if (Number(CONSULT?.no > 0)) {
                throw new common_1.ConflictException('이미 신청이 완료되었습니다.');
            }
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const User = await this.users.findOne({
                where: {
                    no,
                },
            });
            const NEW_CONSULT = await this.consults.create({
                ...params,
                user: User,
            });
            await this.consults.save(NEW_CONSULT);
            await this.notionService.notionInsertConsult({
                name: NEW_CONSULT.name,
                type: NEW_CONSULT.type.toString(),
                userName: NEW_CONSULT.user.nickname,
                detail: NEW_CONSULT.detail,
                phone: NEW_CONSULT.phone,
            });
            return {
                statusCode: 200,
            };
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async doneConsult(params) {
        try {
            const { no } = params;
            const CONSULT = await this.consults.findOne({
                where: {
                    no,
                    isDone: false,
                },
            });
            CONSULT.isDone = true;
            await this.consults.save(CONSULT);
            return {
                statusCode: 200,
                message: `수정이 완료되었습니다.`,
                data: CONSULT,
            };
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
};
ConsultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consult_entitiy_1.Consult)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        notion_service_1.NotionService])
], ConsultService);
exports.ConsultService = ConsultService;
//# sourceMappingURL=consult.service.js.map