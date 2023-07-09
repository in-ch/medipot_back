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
exports.TotalCountDto = exports.ReplyDeleteDto = exports.ReplyPaginationDto = exports.ReplyHeaderDto = exports.ReplyCrudDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../commons/dtos");
class ReplyCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplyCrudDto.prototype, "writingNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplyCrudDto.prototype, "comment", void 0);
exports.ReplyCrudDto = ReplyCrudDto;
class ReplyHeaderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplyHeaderDto.prototype, "authorization", void 0);
exports.ReplyHeaderDto = ReplyHeaderDto;
class ReplyPaginationDto extends dtos_1.PaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplyPaginationDto.prototype, "writingNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplyPaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplyPaginationDto.prototype, "limit", void 0);
exports.ReplyPaginationDto = ReplyPaginationDto;
class ReplyDeleteDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplyDeleteDto.prototype, "replyNo", void 0);
exports.ReplyDeleteDto = ReplyDeleteDto;
class TotalCountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TotalCountDto.prototype, "writingNo", void 0);
exports.TotalCountDto = TotalCountDto;
//# sourceMappingURL=reply.dto.js.map