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
exports.DeletedNestedReplyHeaderDto = exports.DeletedNestedReplyCrudDto = exports.NestedHeaderDto = exports.NestedReplyListPagination = exports.CreateNestedReplyHeaderParams = exports.CreateNestedReplyParams = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../commons/dtos");
class CreateNestedReplyParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateNestedReplyParams.prototype, "replyNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNestedReplyParams.prototype, "comment", void 0);
exports.CreateNestedReplyParams = CreateNestedReplyParams;
class CreateNestedReplyHeaderParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNestedReplyHeaderParams.prototype, "authorization", void 0);
exports.CreateNestedReplyHeaderParams = CreateNestedReplyHeaderParams;
class NestedReplyListPagination extends dtos_1.PaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NestedReplyListPagination.prototype, "replyNo", void 0);
exports.NestedReplyListPagination = NestedReplyListPagination;
class NestedHeaderDto extends CreateNestedReplyHeaderParams {
}
exports.NestedHeaderDto = NestedHeaderDto;
class DeletedNestedReplyCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeletedNestedReplyCrudDto.prototype, "nestedReplyNo", void 0);
exports.DeletedNestedReplyCrudDto = DeletedNestedReplyCrudDto;
class DeletedNestedReplyHeaderDto extends CreateNestedReplyHeaderParams {
}
exports.DeletedNestedReplyHeaderDto = DeletedNestedReplyHeaderDto;
//# sourceMappingURL=nestedReply.dto.js.map