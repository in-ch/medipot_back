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
exports.NestedReplyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const grant_strategy_1 = require("../user/strategy/grant.strategy");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const nestedReply_dto_1 = require("./dto/nestedReply.dto");
const nested_reply_service_1 = require("./nested-reply.service");
let NestedReplyController = class NestedReplyController {
    constructor(nestedReplyService) {
        this.nestedReplyService = nestedReplyService;
    }
    async addNestedReply(params, header) {
        return this.nestedReplyService.addNestedReply(params, header);
    }
    async getNestedReplys(request) {
        return this.nestedReplyService.getNestedReplys(request);
    }
    async deleteNestedReply(payload, header) {
        return this.nestedReplyService.deletedNestedReply(payload, header);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: nestedReply_dto_1.CreateNestedReplyParams }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestedReply_dto_1.CreateNestedReplyParams,
        nestedReply_dto_1.CreateNestedReplyHeaderParams]),
    __metadata("design:returntype", Promise)
], NestedReplyController.prototype, "addNestedReply", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: nestedReply_dto_1.NestedReplyListPagination }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NestedReplyController.prototype, "getNestedReplys", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: nestedReply_dto_1.NestedReplyListPagination }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestedReply_dto_1.DeletedNestedReplyCrudDto,
        nestedReply_dto_1.DeletedNestedReplyHeaderDto]),
    __metadata("design:returntype", Promise)
], NestedReplyController.prototype, "deleteNestedReply", null);
NestedReplyController = __decorate([
    (0, swagger_1.ApiTags)('대댓글'),
    (0, common_1.Controller)('nestedReply'),
    (0, common_1.UseGuards)(grant_strategy_1.GrantGuard),
    __metadata("design:paramtypes", [nested_reply_service_1.NestedReplyService])
], NestedReplyController);
exports.NestedReplyController = NestedReplyController;
//# sourceMappingURL=nested-reply.controller.js.map