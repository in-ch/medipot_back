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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const admin_service_1 = require("./admin.service");
const admin_user_dto_1 = require("./dto/admin.user.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    createAdminUser(payload) {
        return this.adminService.createAdminUser(payload);
    }
    loginAdmin(payload) {
        return this.adminService.adminLogin(payload);
    }
    refreshAdmin(payload) {
        return this.adminService.adminRefresh(payload);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: admin_user_dto_1.AdminUserCreateCrudDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_dto_1.AdminUserCreateCrudDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdminUser", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: admin_user_dto_1.AdminUserLoginCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_dto_1.AdminUserLoginCrudDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "loginAdmin", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: admin_user_dto_1.AdminUserRefreshCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_dto_1.AdminUserRefreshCrudDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "refreshAdmin", null);
AdminController = __decorate([
    (0, swagger_1.ApiTags)('어드민'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map