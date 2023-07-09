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
exports.UserGrantRequestListPagination = exports.RequestDepartmentHeaderDto = exports.UpdateUserGrantBodyDto = exports.RequestGrantHeaderDto = exports.RequestGrantCrudDto = exports.GetUserGrantHeader = exports.RefreshOutputDto = exports.RefreshHeader = exports.RefreshParams = exports.SearchUserCrudDto = exports.UpdateProfileOutputDto = exports.UpdateProfileHeaderDto = exports.UpdateProfileCrudDto = exports.MeOutputCrudDto = exports.MeInputDto = exports.UserLoginOutputCrudDto = exports.UserLoginCrudDto = exports.UserCreateOutputCrudDto = exports.UserCreateInputCrudDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../commons/dtos");
const user_entitiy_1 = require("../entities/user.entitiy");
class UserCreateInputCrudDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateInputCrudDto.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateInputCrudDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateInputCrudDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserCreateInputCrudDto.prototype, "marketingConsent", void 0);
exports.UserCreateInputCrudDto = UserCreateInputCrudDto;
class UserCreateOutputCrudDto extends UserCreateInputCrudDto {
}
exports.UserCreateOutputCrudDto = UserCreateOutputCrudDto;
class UserLoginCrudDto extends (0, mapped_types_1.PickType)(UserCreateInputCrudDto, ['email', 'password']) {
}
exports.UserLoginCrudDto = UserLoginCrudDto;
class UserLoginOutputCrudDto extends UserCreateInputCrudDto {
}
exports.UserLoginOutputCrudDto = UserLoginOutputCrudDto;
class MeInputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MeInputDto.prototype, "authorization", void 0);
exports.MeInputDto = MeInputDto;
class MeOutputCrudDto extends UserLoginOutputCrudDto {
}
exports.MeOutputCrudDto = MeOutputCrudDto;
class UpdateProfileCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileCrudDto.prototype, "profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileCrudDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileCrudDto.prototype, "department", void 0);
exports.UpdateProfileCrudDto = UpdateProfileCrudDto;
class UpdateProfileHeaderDto extends MeInputDto {
}
exports.UpdateProfileHeaderDto = UpdateProfileHeaderDto;
class UpdateProfileOutputDto {
}
exports.UpdateProfileOutputDto = UpdateProfileOutputDto;
class SearchUserCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchUserCrudDto.prototype, "no", void 0);
exports.SearchUserCrudDto = SearchUserCrudDto;
class RefreshParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RefreshParams.prototype, "no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshParams.prototype, "refresh_token", void 0);
exports.RefreshParams = RefreshParams;
class RefreshHeader extends MeInputDto {
}
exports.RefreshHeader = RefreshHeader;
class RefreshOutputDto extends MeInputDto {
}
exports.RefreshOutputDto = RefreshOutputDto;
class GetUserGrantHeader extends MeInputDto {
}
exports.GetUserGrantHeader = GetUserGrantHeader;
class RequestGrantCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestGrantCrudDto.prototype, "license", void 0);
exports.RequestGrantCrudDto = RequestGrantCrudDto;
class RequestGrantHeaderDto extends MeInputDto {
}
exports.RequestGrantHeaderDto = RequestGrantHeaderDto;
class UpdateUserGrantBodyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserGrantBodyDto.prototype, "userNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserGrantBodyDto.prototype, "grant", void 0);
exports.UpdateUserGrantBodyDto = UpdateUserGrantBodyDto;
class RequestDepartmentHeaderDto extends MeInputDto {
}
exports.RequestDepartmentHeaderDto = RequestDepartmentHeaderDto;
class UserGrantRequestListPagination extends dtos_1.PaginationDto {
}
exports.UserGrantRequestListPagination = UserGrantRequestListPagination;
//# sourceMappingURL=user.dto.js.map