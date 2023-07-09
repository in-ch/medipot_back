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
exports.NestedReplyService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alarm_service_1 = require("../alarm/alarm.service");
const reply_entity_1 = require("../reply/entities/reply.entity");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const nestedReply_dto_1 = require("./dto/nestedReply.dto");
const nestedReply_entitiy_1 = require("./entities/nestedReply.entitiy");
const alarm_entitiy_1 = require("../alarm/entities/alarm.entitiy");
let NestedReplyService = class NestedReplyService {
    constructor(nestedReplys, users, replys, jwtService, alarmService) {
        this.nestedReplys = nestedReplys;
        this.users = users;
        this.replys = replys;
        this.jwtService = jwtService;
        this.alarmService = alarmService;
    }
    async addNestedReply(params, header) {
        const { comment, replyNo } = params;
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const User = await this.users.findOne({
                where: {
                    no,
                },
            });
            const Reply = await this.replys.findOne({
                where: {
                    no: replyNo,
                },
                relations: ['user'],
                loadRelationIds: true,
            });
            const NestedReply = await this.nestedReplys.save(this.nestedReplys.create({
                user: User,
                reply: Reply,
                comment,
            }));
            if (no !== Reply.user.no)
                await this.alarmService.addAlarm({
                    userNo: Reply.user.no,
                    type: alarm_entitiy_1.ALARM_TYPE.commentToComment,
                });
            return {
                statusCode: 200,
                data: NestedReply,
            };
        }
        catch (e) {
            console.error(`addNestedReply API Error: ${e}`);
            throw e;
        }
    }
    async getNestedReplys(request) {
        const { query: { limit, page, replyNo }, } = request;
        try {
            const nestedReplys = await this.nestedReplys.find({
                take: Number(limit) || 10,
                skip: Number(page) * Number(limit) || 0,
                where: {
                    reply: {
                        no: Number(replyNo),
                    },
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
                relations: ['user'],
            });
            const totalCount = await this.nestedReplys.count({
                where: {
                    reply: {
                        no: Number(replyNo),
                    },
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            return {
                statusCode: 200,
                data: {
                    page: Number(page),
                    totalCount,
                    list: nestedReplys,
                },
            };
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async deletedNestedReply(payload, header) {
        const { nestedReplyNo } = payload;
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const NestedReply = await this.nestedReplys.findOne({
                where: {
                    no: nestedReplyNo,
                    deletedAt: (0, typeorm_2.IsNull)(),
                    user: {
                        no,
                    },
                },
            });
            await this.nestedReplys.softDelete({
                no: nestedReplyNo,
                deletedAt: (0, typeorm_2.IsNull)(),
                user: {
                    no,
                },
            });
            return {
                statusCode: 200,
                data: NestedReply,
            };
        }
        catch (e) {
            console.error(`deletedNestedReply API Error: ${e}`);
            throw e;
        }
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestedReply_dto_1.CreateNestedReplyParams,
        nestedReply_dto_1.CreateNestedReplyHeaderParams]),
    __metadata("design:returntype", Promise)
], NestedReplyService.prototype, "addNestedReply", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NestedReplyService.prototype, "getNestedReplys", null);
NestedReplyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nestedReply_entitiy_1.NestedReply)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(reply_entity_1.Reply)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        alarm_service_1.AlarmService])
], NestedReplyService);
exports.NestedReplyService = NestedReplyService;
//# sourceMappingURL=nested-reply.service.js.map