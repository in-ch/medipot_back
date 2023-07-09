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
exports.KakaoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const kakao_dto_1 = require("./dto/kakao.dto");
const kakao_service_1 = require("./kakao.service");
let KakaoController = class KakaoController {
    constructor(kakaoService) {
        this.kakaoService = kakaoService;
    }
    me(header) {
        return this.kakaoService.me(header);
    }
    refresh(params) {
        return this.kakaoService.refresh(params);
    }
    logout(header) {
        return this.kakaoService.logout(header);
    }
    kakaoLogin(params) {
        return this.kakaoService.kakaoLogin(params);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({}),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/me'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakao_dto_1.MeInputDto]),
    __metadata("design:returntype", Promise)
], KakaoController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: kakao_dto_1.RefreshInputDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakao_dto_1.RefreshInputDto]),
    __metadata("design:returntype", Promise)
], KakaoController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: kakao_dto_1.LogoutInputDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakao_dto_1.LogoutInputDto]),
    __metadata("design:returntype", Promise)
], KakaoController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: kakao_dto_1.KakaoLoginInputDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakao_dto_1.KakaoLoginInputDto]),
    __metadata("design:returntype", Promise)
], KakaoController.prototype, "kakaoLogin", null);
KakaoController = __decorate([
    (0, swagger_1.ApiTags)('Kakao'),
    (0, common_1.Controller)('kakao'),
    __metadata("design:paramtypes", [kakao_service_1.KakaoService])
], KakaoController);
exports.KakaoController = KakaoController;
//# sourceMappingURL=kakao.controller.js.map