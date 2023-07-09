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
exports.ConsultController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const consult_service_1 = require("./consult.service");
const consult_dto_1 = require("./dto/consult.dto");
let ConsultController = class ConsultController {
    constructor(consultService) {
        this.consultService = consultService;
    }
    async sendConsultAdd(params, header) {
        return this.consultService.sendConsultAdd(params, header);
    }
    async list(request, header) {
        return this.consultService.list(request.query, header);
    }
    async doneConsult(params) {
        return this.consultService.doneConsult(params);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: consult_dto_1.SendConsultAddParams }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consult_dto_1.SendConsultAddParams,
        consult_dto_1.SendConsultAddHeaders]),
    __metadata("design:returntype", Promise)
], ConsultController.prototype, "sendConsultAdd", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: consult_dto_1.ConsultListPagination }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, consult_dto_1.ConsultListHeaders]),
    __metadata("design:returntype", Promise)
], ConsultController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: consult_dto_1.DoneConsultParams }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Post)('/done'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consult_dto_1.DoneConsultParams]),
    __metadata("design:returntype", Promise)
], ConsultController.prototype, "doneConsult", null);
ConsultController = __decorate([
    (0, swagger_1.ApiTags)('상담 신청'),
    (0, common_1.Controller)('consult'),
    __metadata("design:paramtypes", [consult_service_1.ConsultService])
], ConsultController);
exports.ConsultController = ConsultController;
//# sourceMappingURL=consult.controller.js.map