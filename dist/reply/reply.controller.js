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
exports.ReplyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const grant_strategy_1 = require("../user/strategy/grant.strategy");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const reply_dto_1 = require("./dto/reply.dto");
const reply_service_1 = require("./reply.service");
let ReplyController = class ReplyController {
    constructor(replysService) {
        this.replysService = replysService;
    }
    getReplys(request) {
        return this.replysService.getReplys(request);
    }
    getReplysWritings(header) {
        return this.replysService.getReplysWritings(header);
    }
    like(payload, header) {
        return this.replysService.create(payload, header);
    }
    replyDelete(request, header) {
        return this.replysService.delete(request, header);
    }
    totalCount(request) {
        return this.replysService.totalCount(request);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: reply_dto_1.ReplyPaginationDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReplyController.prototype, "getReplys", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)('/writings'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_dto_1.ReplyHeaderDto]),
    __metadata("design:returntype", Promise)
], ReplyController.prototype, "getReplysWritings", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: reply_dto_1.ReplyCrudDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_dto_1.ReplyCrudDto,
        reply_dto_1.ReplyHeaderDto]),
    __metadata("design:returntype", Promise)
], ReplyController.prototype, "like", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: reply_dto_1.ReplyDeleteDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reply_dto_1.ReplyHeaderDto]),
    __metadata("design:returntype", Promise)
], ReplyController.prototype, "replyDelete", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: reply_dto_1.TotalCountDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)('/total'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReplyController.prototype, "totalCount", null);
ReplyController = __decorate([
    (0, swagger_1.ApiTags)('댓글'),
    (0, common_1.Controller)('reply'),
    (0, common_1.UseGuards)(grant_strategy_1.GrantGuard),
    __metadata("design:paramtypes", [reply_service_1.ReplyService])
], ReplyController);
exports.ReplyController = ReplyController;
//# sourceMappingURL=reply.controller.js.map