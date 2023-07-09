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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserRefreshOutputCrudDto = exports.AdminUserRefreshCrudDto = exports.AdminUserOutputCrudDto = exports.AdminUserCreateCrudDto = exports.AdminUserLoginCrudDto = exports.AdminUserCrudDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const admin_user_entitiy_1 = require("../entities/admin-user.entitiy");
class AdminUserCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserCrudDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserCrudDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserCrudDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(admin_user_entitiy_1.grant),
    __metadata("design:type", Number)
], AdminUserCrudDto.prototype, "grant", void 0);
exports.AdminUserCrudDto = AdminUserCrudDto;
class AdminUserLoginCrudDto extends (0, mapped_types_1.PickType)(AdminUserCrudDto, ['id', 'password']) {
}
exports.AdminUserLoginCrudDto = AdminUserLoginCrudDto;
class AdminUserCreateCrudDto extends AdminUserCrudDto {
}
exports.AdminUserCreateCrudDto = AdminUserCreateCrudDto;
class AdminUserOutputCrudDto extends AdminUserCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserOutputCrudDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserOutputCrudDto.prototype, "refresh_token", void 0);
exports.AdminUserOutputCrudDto = AdminUserOutputCrudDto;
class AdminUserRefreshCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserRefreshCrudDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserRefreshCrudDto.prototype, "refresh_token", void 0);
exports.AdminUserRefreshCrudDto = AdminUserRefreshCrudDto;
class AdminUserRefreshOutputCrudDto extends AdminUserCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserRefreshOutputCrudDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserRefreshOutputCrudDto.prototype, "refresh_token", void 0);
exports.AdminUserRefreshOutputCrudDto = AdminUserRefreshOutputCrudDto;
//# sourceMappingURL=admin.user.dto.js.map