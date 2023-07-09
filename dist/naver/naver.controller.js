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
exports.NaverController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const naver_dto_1 = require("./dto/naver.dto");
const naver_service_1 = require("./naver.service");
let NaverController = class NaverController {
    constructor(naverService) {
        this.naverService = naverService;
    }
    me(payload) {
        return this.naverService.me(payload);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({}),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/me'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [naver_dto_1.MePayloadDto]),
    __metadata("design:returntype", Promise)
], NaverController.prototype, "me", null);
NaverController = __decorate([
    (0, swagger_1.ApiTags)('Naver'),
    (0, common_1.Controller)('naver'),
    __metadata("design:paramtypes", [naver_service_1.NaverService])
], NaverController);
exports.NaverController = NaverController;
//# sourceMappingURL=naver.controller.js.map