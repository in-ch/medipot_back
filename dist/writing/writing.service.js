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
exports.WritingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const writing_1 = require("./entities/writing");
const jwt_1 = require("@nestjs/jwt");
const user_entitiy_1 = require("../user/entities/user.entitiy");
let WritingService = class WritingService {
    constructor(writings, users, jwtService) {
        this.writings = writings;
        this.users = users;
        this.jwtService = jwtService;
    }
    async getWritings(query) {
        const { tag, userNo, text, limit, page } = query;
        try {
            const writings = await this.writings.find({
                take: limit || 10,
                skip: page * limit || 0,
                where: {
                    user: {
                        no: userNo,
                    },
                    tags: tag !== '인기게시판' && tag ? (0, typeorm_2.ArrayContains)([tag]) : (0, typeorm_2.ArrayContains)([]),
                    title: text ? (0, typeorm_2.ILike)(`%${text}%`) : (0, typeorm_2.ILike)(`%%`),
                    text: text ? (0, typeorm_2.ILike)(`%${text}%`) : (0, typeorm_2.ILike)(`%%`),
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
                relations: ['user', 'like', 'like.user', 'reply'],
                order: tag === '인기게시판' && {
                    like: {
                        no: 'ASC',
                    },
                },
            });
            return {
                totalCount: writings.length,
                statusCode: 200,
                data: {
                    page,
                    list: writings,
                },
            };
        }
        catch (e) {
            console.error(`getWritings API Error: ${e}`);
            throw e;
        }
    }
    async getWriting(query) {
        const { no } = query;
        try {
            const Writing = await this.writings.findOne({
                where: {
                    no,
                },
                relations: ['user', 'like', 'like.user', 'reply'],
            });
            Writing.reply.map((replyData, index) => {
                replyData.deletedAt && delete Writing.reply[index];
            });
            return {
                statusCode: 200,
                data: Writing,
            };
        }
        catch (e) {
            console.error(`getWriting API Error: ${e}`);
            throw e;
        }
    }
    async addWriting(header, payload) {
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const user = await this.users.findOne({
                where: {
                    no,
                },
            });
            const Writing = await this.writings.save(this.writings.create({ ...payload, user }));
            this.writings.save(Writing);
            return {
                statusCode: 200,
                data: Writing,
            };
        }
        catch (e) {
            console.error(`addWriting api Error: ${e}`);
            throw e;
        }
    }
    async deleteWriting(header, payload) {
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const { writingNo } = payload;
            const USER = await this.users.findOne({
                where: {
                    no,
                },
            });
            const WRITING = await this.writings.findOne({
                where: {
                    no: writingNo,
                },
                relations: ['user'],
            });
            if (USER.no !== WRITING.user.no)
                throw new common_1.NotAcceptableException('권한이 없습니다.');
            await this.writings.softDelete({
                no: writingNo,
            });
            return {
                statusCode: 200,
                data: WRITING,
            };
        }
        catch (e) {
            console.error(`delete writing api Error: ${e}`);
            throw new common_1.BadRequestException('글 삭제에 실패했습니다.');
        }
    }
};
WritingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(writing_1.Writing)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], WritingService);
exports.WritingService = WritingService;
//# sourceMappingURL=writing.service.js.map