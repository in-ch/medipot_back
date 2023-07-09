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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
let AuthController = class AuthController {
    constructor(authsService) {
        this.authsService = authsService;
    }
    async sendAuthEmail(payload) {
        return this.authsService.sendAuthEmail(payload);
    }
    async emailValidation(payload) {
        return this.authsService.emailValidation(payload);
    }
    async nicknameValidation(payload) {
        return this.authsService.nicknameValidation(payload);
    }
    async sendPhoneValidation(payload, header) {
        return this.authsService.sendPhoneValidation(payload, header);
    }
    async phoneValidation(payload, header) {
        return this.authsService.phoneValidation(payload, header);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: auth_dto_1.AuthEmailParams }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/email/send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthEmailParams]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendAuthEmail", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: auth_dto_1.EmailValidationParams }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/email/validation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.EmailValidationParams]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "emailValidation", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: auth_dto_1.NicknameValidationParams }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/nickname/validation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.NicknameValidationParams]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "nicknameValidation", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: auth_dto_1.SendPhoneValidationParams }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/phone/validation/send'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SendPhoneValidationParams,
        auth_dto_1.sendPhoneValidationHeader]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendPhoneValidation", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.ValidationPhoneParams }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/phone/validation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ValidationPhoneParams,
        auth_dto_1.ValidationPhoneHeader]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "phoneValidation", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map