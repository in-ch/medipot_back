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
exports.ReplyService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const alarm_service_1 = require("../alarm/alarm.service");
const alarm_entitiy_1 = require("../alarm/entities/alarm.entitiy");
const nestedReply_entitiy_1 = require("../nested-reply/entities/nestedReply.entitiy");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const writing_1 = require("../writing/entities/writing");
const typeorm_2 = require("typeorm");
const reply_dto_1 = require("./dto/reply.dto");
const reply_entity_1 = require("./entities/reply.entity");
let ReplyService = class ReplyService {
    constructor(users, writings, replys, nestedReplys, jwtService, alarmService) {
        this.users = users;
        this.writings = writings;
        this.replys = replys;
        this.nestedReplys = nestedReplys;
        this.jwtService = jwtService;
        this.alarmService = alarmService;
    }
    async getReplys(request) {
        const { query: { writingNo, limit, page }, } = request;
        try {
            const replys = await this.replys.find({
                take: Number(limit) || 10,
                skip: Number(page) * Number(limit) || 0,
                where: {
                    writing: {
                        no: Number(writingNo),
                    },
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
                relations: ['user'],
            });
            const totalCount = replys.length;
            for (let reply of replys) {
                const nested_reply_count = await this.nestedReplys.count({
                    where: {
                        reply: {
                            no: reply.no,
                        },
                    },
                });
                reply.totalCount = nested_reply_count;
            }
            return {
                totalCount,
                statusCode: 200,
                data: {
                    page: Number(page),
                    list: replys,
                },
            };
        }
        catch (e) {
            console.error(`getReplys API Error: ${e}`);
            throw e;
        }
    }
    async getReplysWritings(header) {
        try {
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const REPLYS = await this.replys
                .createQueryBuilder('reply')
                .select('DISTINCT reply.writing_id', 'writing_id')
                .leftJoin('reply.user', 'user')
                .where('user.no = :userNo', { userNo: no })
                .getRawMany();
            const writingIds = REPLYS.map((item) => item.writing_id);
            const writings = await this.writings
                .createQueryBuilder('writing')
                .leftJoinAndSelect('writing.user', 'user')
                .leftJoinAndSelect('writing.reply', 'reply')
                .leftJoinAndSelect('writing.like', 'like')
                .leftJoinAndSelect('like.user', 'likeUser')
                .where('writing.no IN (:...writingIds)', { writingIds })
                .select(['writing', 'user', 'reply', 'like', 'likeUser.no'])
                .getMany();
            return {
                statusCode: 200,
                data: writings,
                totalCount: writings.length,
            };
        }
        catch (e) {
            console.error(e);
        }
    }
    async create(payload, header) {
        try {
            const { writingNo, comment } = payload;
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const User = await this.users.findOne({
                where: {
                    no,
                },
            });
            const Writing = await this.writings.findOne({
                where: {
                    no: writingNo,
                },
                relations: ['user'],
                loadRelationIds: true,
            });
            const NewWriting = await this.replys.save(this.replys.create({
                user: User,
                writing: Writing,
                comment,
            }));
            if (no !== Writing.user.no)
                this.alarmService.addAlarm({
                    userNo: Writing.user.no,
                    type: alarm_entitiy_1.ALARM_TYPE.comment,
                });
            return {
                statusCode: 200,
                data: NewWriting,
            };
        }
        catch (e) {
            console.error(`댓글 생성 API Error: ${e}`);
            throw e;
        }
    }
    async delete(request, header) {
        try {
            const { query: { replyNo }, } = request;
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const Reply = await this.replys.findOne({
                where: {
                    no: Number(replyNo),
                    user: {
                        no,
                    },
                },
            });
            await this.replys.softDelete({
                no: Number(replyNo),
                user: {
                    no,
                },
            });
            return {
                statusCode: 200,
                data: Reply,
            };
        }
        catch (e) {
            console.error(`댓글 삭제 API Error: ${e}`);
            throw e;
        }
    }
    async totalCount(request) {
        try {
            const { query: { writingNo }, } = request;
            const replys = await this.replys.count({
                where: {
                    writing: {
                        no: Number(writingNo),
                    },
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            return {
                statusCode: 200,
                data: replys,
            };
        }
        catch (e) {
            console.error(`totalCound API Error: ${e}`);
        }
    }
};
__decorate([
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_dto_1.ReplyHeaderDto]),
    __metadata("design:returntype", Promise)
], ReplyService.prototype, "getReplysWritings", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_dto_1.ReplyCrudDto,
        reply_dto_1.ReplyHeaderDto]),
    __metadata("design:returntype", Promise)
], ReplyService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reply_dto_1.ReplyHeaderDto]),
    __metadata("design:returntype", Promise)
], ReplyService.prototype, "delete", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReplyService.prototype, "totalCount", null);
ReplyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(writing_1.Writing)),
    __param(2, (0, typeorm_1.InjectRepository)(reply_entity_1.Reply)),
    __param(3, (0, typeorm_1.InjectRepository)(nestedReply_entitiy_1.NestedReply)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        alarm_service_1.AlarmService])
], ReplyService);
exports.ReplyService = ReplyService;
//# sourceMappingURL=reply.service.js.map