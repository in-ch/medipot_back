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
exports.WritingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const user_dto_1 = require("../user/dto/user.dto");
const grant_strategy_1 = require("../user/strategy/grant.strategy");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const writing_dto_1 = require("./dto/writing.dto");
const writing_service_1 = require("./writing.service");
let WritingController = class WritingController {
    constructor(writingService) {
        this.writingService = writingService;
    }
    create(header, payload) {
        return this.writingService.addWriting(header, payload);
    }
    getWritings(request) {
        return this.writingService.getWritings(request.query);
    }
    getWriting(request) {
        return this.writingService.getWriting(request.query);
    }
    deleteWriting(header, payload) {
        return this.writingService.deleteWriting(header, payload);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: writing_dto_1.WritingCreateDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.MeInputDto,
        writing_dto_1.WritingCreateDto]),
    __metadata("design:returntype", Promise)
], WritingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: writing_dto_1.WritingListDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WritingController.prototype, "getWritings", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: writing_dto_1.WritingDetailDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)('/detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WritingController.prototype, "getWriting", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: writing_dto_1.WritingDeleteDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.MeInputDto,
        writing_dto_1.WritingDeleteDto]),
    __metadata("design:returntype", Promise)
], WritingController.prototype, "deleteWriting", null);
WritingController = __decorate([
    (0, swagger_1.ApiTags)('커뮤니티 글'),
    (0, common_1.Controller)('writing'),
    (0, common_1.UseGuards)(grant_strategy_1.GrantGuard, jwtAuthentication_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [writing_service_1.WritingService])
], WritingController);
exports.WritingController = WritingController;
//# sourceMappingURL=writing.controller.js.map