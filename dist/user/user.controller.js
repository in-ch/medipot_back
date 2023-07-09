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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const grant_strategy_1 = require("../admin/strategy/grant.strategy");
const dtos_1 = require("../commons/dtos");
const user_dto_1 = require("./dto/user.dto");
const jwtAuthentication_guard_1 = require("./strategy/jwtAuthentication.guard");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(payload) {
        return this.usersService.createUser(payload);
    }
    login(payload) {
        return this.usersService.login(payload);
    }
    me(header) {
        return this.usersService.me(header);
    }
    updateProfile(payload, header) {
        return this.usersService.updateProfile(payload, header);
    }
    requestGrant(payload, header) {
        return this.usersService.requestGrant(payload, header);
    }
    getGrants(request) {
        return this.usersService.getGrants(request);
    }
    getDepartment(header) {
        return this.usersService.getDepartment(header);
    }
    updateUserGrant(payload) {
        return this.usersService.updateUserGrant(payload);
    }
    refresh(payload) {
        return this.usersService.refresh(payload);
    }
    searchUser(request) {
        return this.usersService.searchUser(request);
    }
    getUserGrant(header) {
        return this.usersService.getUserGrant(header);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.UserCreateInputCrudDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCreateInputCrudDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.UserLoginCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginCrudDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiBody)({}),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/me'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.MeInputDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.UpdateProfileCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/profile/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateProfileCrudDto,
        user_dto_1.UpdateProfileHeaderDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.RequestGrantCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/profile/grant'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RequestGrantCrudDto,
        user_dto_1.RequestGrantHeaderDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestGrant", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.RequestGrantCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(grant_strategy_1.AdminGuard),
    (0, common_1.Get)('/grant/list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getGrants", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.RequestDepartmentHeaderDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/department'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RequestDepartmentHeaderDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDepartment", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: Boolean }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(grant_strategy_1.AdminGuard),
    (0, common_1.Put)('/profile/grant/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserGrantBodyDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserGrant", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.RefreshParams }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RefreshParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.SearchUserCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUser", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: user_dto_1.SearchUserCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/grant'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.GetUserGrantHeader]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserGrant", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('유저'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map