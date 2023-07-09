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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const grant_strategy_1 = require("../user/strategy/grant.strategy");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const like_1 = require("./dto/like");
const like_service_1 = require("./like.service");
let LikeController = class LikeController {
    constructor(likesService) {
        this.likesService = likesService;
    }
    like(payload, header) {
        return this.likesService.like(payload, header);
    }
    unlike(payload, header) {
        return this.likesService.unlike(payload, header);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: like_1.LikeCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_1.LikeCrudDto,
        like_1.LikeHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "like", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: like_1.UnlikeCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_1.UnlikeCrudDto,
        like_1.UnlikeHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "unlike", null);
LikeController = __decorate([
    (0, swagger_1.ApiTags)('좋아용'),
    (0, common_1.Controller)('like'),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard, grant_strategy_1.GrantGuard),
    __metadata("design:paramtypes", [like_service_1.LikeService])
], LikeController);
exports.LikeController = LikeController;
//# sourceMappingURL=like.controller.js.map