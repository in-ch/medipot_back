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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const jwt_1 = require("@nestjs/jwt");
const writing_1 = require("../writing/entities/writing");
const report_entity_1 = require("./entities/report.entity");
const reply_entity_1 = require("../reply/entities/reply.entity");
const notion_service_1 = require("../utills/notion/notion.service");
const nestedReply_entitiy_1 = require("../nested-reply/entities/nestedReply.entitiy");
let ReportService = class ReportService {
    constructor(users, writings, replys, nestedReplys, reports, jwtService, notionService) {
        this.users = users;
        this.writings = writings;
        this.replys = replys;
        this.nestedReplys = nestedReplys;
        this.reports = reports;
        this.jwtService = jwtService;
        this.notionService = notionService;
    }
    async create(payload, header) {
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const { writingNo } = payload;
            const User_report = await this.users.findOne({
                where: {
                    no,
                },
            });
            const Writing = await this.writings.findOne({
                where: {
                    no: writingNo,
                },
                relations: ['user'],
            });
            this.reports.save(this.reports.create({
                user_report: User_report,
                user_reported: Writing.user,
                writing: Writing,
            }));
            this.notionService.notionInsertReport({
                contentId: Writing.no.toString(),
                tag: '글 신고',
                reportUserName: User_report.nickname,
                reportedUserName: Writing.user.nickname,
                detail: Writing.text,
            });
            return {
                statusCode: 200,
            };
        }
        catch (e) {
            console.error(`글 신고 API Error: ${e}`);
            throw e;
        }
    }
    async createReplyReport(payload, header) {
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const { replyNo } = payload;
            const User_report = await this.users.findOne({
                where: {
                    no,
                },
            });
            const Reply = await this.replys.findOne({
                where: {
                    no: replyNo,
                },
                relations: ['user'],
            });
            this.reports.save(this.reports.create({
                user_report: User_report,
                user_reported: Reply.user,
                reply: Reply,
            }));
            this.notionService.notionInsertReport({
                contentId: Reply.no.toString(),
                tag: '댓글 신고',
                reportUserName: User_report.nickname,
                reportedUserName: Reply.user.nickname,
                detail: Reply.comment,
            });
            return {
                statusCode: 200,
            };
        }
        catch (e) {
            console.error(`createReplyReport API Error: ${e}`);
            throw e;
        }
    }
    async createNestedReplyReport(payload, header) {
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const { nestedReplyNo } = payload;
            const User_nested_report = await this.users.findOne({
                where: {
                    no,
                },
            });
            const NestedReply = await this.nestedReplys.findOne({
                where: {
                    no: nestedReplyNo,
                },
                relations: ['user'],
            });
            this.reports.save(this.reports.create({
                user_report: User_nested_report,
                user_reported: NestedReply.user,
                nestedReply: NestedReply,
            }));
            this.notionService.notionInsertReport({
                contentId: NestedReply.no.toString(),
                tag: '대댓글 신고',
                reportUserName: User_nested_report.nickname,
                reportedUserName: NestedReply.user.nickname,
                detail: NestedReply.comment,
            });
            return {
                statusCode: 200,
            };
        }
        catch (e) {
            console.error(`createNestedReplyReport API Error: ${e}`);
            throw e;
        }
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(writing_1.Writing)),
    __param(2, (0, typeorm_1.InjectRepository)(reply_entity_1.Reply)),
    __param(3, (0, typeorm_1.InjectRepository)(nestedReply_entitiy_1.NestedReply)),
    __param(4, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        notion_service_1.NotionService])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map