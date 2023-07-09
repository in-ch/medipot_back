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
exports.NestedReportHeaderDto = exports.NestedReportReplyCrudDto = exports.ReportReplyCrudDto = exports.ReportListPagination = exports.ReportHeaderDto = exports.ReportCrudDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../commons/dtos");
class ReportCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReportCrudDto.prototype, "writingNo", void 0);
exports.ReportCrudDto = ReportCrudDto;
class ReportHeaderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReportHeaderDto.prototype, "authorization", void 0);
exports.ReportHeaderDto = ReportHeaderDto;
class ReportListPagination extends dtos_1.PaginationDto {
}
exports.ReportListPagination = ReportListPagination;
class ReportReplyCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReportReplyCrudDto.prototype, "replyNo", void 0);
exports.ReportReplyCrudDto = ReportReplyCrudDto;
class NestedReportReplyCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NestedReportReplyCrudDto.prototype, "nestedReplyNo", void 0);
exports.NestedReportReplyCrudDto = NestedReportReplyCrudDto;
class NestedReportHeaderDto extends ReportHeaderDto {
}
exports.NestedReportHeaderDto = NestedReportHeaderDto;
//# sourceMappingURL=report.dto.js.map