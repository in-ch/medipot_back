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
exports.EmailValidationOutput = exports.NicknameValidationResponse = exports.sendPhoneValidationHeader = exports.SendPhoneValidationParams = exports.ValidationPhoneHeader = exports.ValidationPhoneParams = exports.NicknameValidationParams = exports.EmailValidationParams = exports.AuthEmailOutput = exports.AuthEmailParams = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AuthEmailParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthEmailParams.prototype, "email", void 0);
exports.AuthEmailParams = AuthEmailParams;
class AuthEmailOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthEmailOutput.prototype, "message", void 0);
exports.AuthEmailOutput = AuthEmailOutput;
class EmailValidationParams extends (0, mapped_types_1.PickType)(AuthEmailParams, ['email']) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailValidationParams.prototype, "code", void 0);
exports.EmailValidationParams = EmailValidationParams;
class NicknameValidationParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NicknameValidationParams.prototype, "nickname", void 0);
exports.NicknameValidationParams = NicknameValidationParams;
class ValidationPhoneParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidationPhoneParams.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidationPhoneParams.prototype, "phone", void 0);
exports.ValidationPhoneParams = ValidationPhoneParams;
class ValidationPhoneHeader {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidationPhoneHeader.prototype, "authorization", void 0);
exports.ValidationPhoneHeader = ValidationPhoneHeader;
class SendPhoneValidationParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendPhoneValidationParams.prototype, "phone", void 0);
exports.SendPhoneValidationParams = SendPhoneValidationParams;
class sendPhoneValidationHeader extends ValidationPhoneHeader {
}
exports.sendPhoneValidationHeader = sendPhoneValidationHeader;
class NicknameValidationResponse {
}
exports.NicknameValidationResponse = NicknameValidationResponse;
class EmailValidationOutput extends AuthEmailOutput {
}
exports.EmailValidationOutput = EmailValidationOutput;
//# sourceMappingURL=auth.dto.js.map