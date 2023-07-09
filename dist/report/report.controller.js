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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const report_dto_1 = require("./dto/report.dto");
const report_service_1 = require("./report.service");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    create(payload, header) {
        return this.reportService.create(payload, header);
    }
    createReply(payload, header) {
        return this.reportService.createReplyReport(payload, header);
    }
    createNestedReply(payload, header) {
        return this.reportService.createNestedReplyReport(payload, header);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: report_dto_1.ReportCrudDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportCrudDto,
        report_dto_1.ReportHeaderDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: report_dto_1.ReportReplyCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/reply'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportReplyCrudDto,
        report_dto_1.ReportHeaderDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "createReply", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: report_dto_1.NestedReportReplyCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/nestedReply'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.NestedReportReplyCrudDto,
        report_dto_1.NestedReportHeaderDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "createNestedReply", null);
ReportController = __decorate([
    (0, swagger_1.ApiTags)('신고'),
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map