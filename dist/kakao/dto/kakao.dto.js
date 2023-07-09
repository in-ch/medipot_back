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
exports.KakaoLoginOutputDto = exports.KakaoLoginInputDto = exports.LogoutOutputDto = exports.LogoutInputDto = exports.RefreshOkOutputDto = exports.RefreshInputDto = exports.MeErrorOutputDto = exports.MeOkOutputDto = exports.MeInputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_dto_1 = require("../../user/dto/user.dto");
class MeInputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MeInputDto.prototype, "authorization", void 0);
exports.MeInputDto = MeInputDto;
class MeOkOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MeOkOutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MeOkOutputDto.prototype, "connected_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], MeOkOutputDto.prototype, "properties", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], MeOkOutputDto.prototype, "kakao_account", void 0);
exports.MeOkOutputDto = MeOkOutputDto;
class MeErrorOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MeErrorOutputDto.prototype, "msg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MeErrorOutputDto.prototype, "code", void 0);
exports.MeErrorOutputDto = MeErrorOutputDto;
class RefreshInputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshInputDto.prototype, "refresh_token", void 0);
exports.RefreshInputDto = RefreshInputDto;
class RefreshOkOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshOkOutputDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshOkOutputDto.prototype, "token_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshOkOutputDto.prototype, "refresh_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshOkOutputDto.prototype, "id_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RefreshOkOutputDto.prototype, "expires_in", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RefreshOkOutputDto.prototype, "refresh_token_expires_in", void 0);
exports.RefreshOkOutputDto = RefreshOkOutputDto;
class LogoutInputDto extends MeInputDto {
}
exports.LogoutInputDto = LogoutInputDto;
class LogoutOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LogoutOutputDto.prototype, "id", void 0);
exports.LogoutOutputDto = LogoutOutputDto;
class KakaoLoginInputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KakaoLoginInputDto.prototype, "authorization", void 0);
exports.KakaoLoginInputDto = KakaoLoginInputDto;
class KakaoLoginOutputDto extends user_dto_1.UserCreateInputCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KakaoLoginOutputDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KakaoLoginOutputDto.prototype, "refresh_token", void 0);
exports.KakaoLoginOutputDto = KakaoLoginOutputDto;
//# sourceMappingURL=kakao.dto.js.map