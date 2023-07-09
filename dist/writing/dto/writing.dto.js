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
exports.WritingDeleteDto = exports.WritingDetailDto = exports.WritingListDto = exports.WritingCreateOutputDto = exports.WritingCreateDto = exports.Writing = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../commons/dtos");
class Writing {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Writing.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Writing.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], Writing.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], Writing.prototype, "imgs", void 0);
exports.Writing = Writing;
class WritingCreateDto extends Writing {
}
exports.WritingCreateDto = WritingCreateDto;
class WritingCreateOutputDto extends Writing {
}
exports.WritingCreateOutputDto = WritingCreateOutputDto;
class WritingListDto extends dtos_1.PaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WritingListDto.prototype, "tag", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WritingListDto.prototype, "userNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WritingListDto.prototype, "text", void 0);
exports.WritingListDto = WritingListDto;
class WritingDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WritingDetailDto.prototype, "no", void 0);
exports.WritingDetailDto = WritingDetailDto;
class WritingDeleteDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WritingDeleteDto.prototype, "writingNo", void 0);
exports.WritingDeleteDto = WritingDeleteDto;
//# sourceMappingURL=writing.dto.js.map