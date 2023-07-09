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
exports.LikeLocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const like_location_1 = require("./dto/like-location");
const like_location_service_1 = require("./like-location.service");
let LikeLocationController = class LikeLocationController {
    constructor(likeLocationsService) {
        this.likeLocationsService = likeLocationsService;
    }
    likeLocation(payload, header) {
        return this.likeLocationsService.likeLocation(payload, header);
    }
    unlikeLocation(payload, header) {
        return this.likeLocationsService.unlikeLocation(payload, header);
    }
    getLikeLocations(header) {
        return this.likeLocationsService.getLikeLocations(header);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: like_location_1.LikeLocationCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_location_1.LikeLocationCrudDto,
        like_location_1.LikeLocationHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeLocationController.prototype, "likeLocation", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: like_location_1.UnlikeLocationCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_location_1.UnlikeLocationCrudDto,
        like_location_1.UnlikeLocationHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeLocationController.prototype, "unlikeLocation", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: (dtos_1.OutputDto) }),
    (0, swagger_1.ApiResponse)({ description: '입지 좋아요 리스트', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_location_1.GetLikeLocationsHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeLocationController.prototype, "getLikeLocations", null);
LikeLocationController = __decorate([
    (0, swagger_1.ApiTags)('입지 좋아용'),
    (0, common_1.Controller)('likeLocation'),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [like_location_service_1.LikeLocationService])
], LikeLocationController);
exports.LikeLocationController = LikeLocationController;
//# sourceMappingURL=like-location.controller.js.map