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
exports.DoneConsultResponse = exports.DoneConsultParams = exports.ConsultListHeaders = exports.ConsultListPagination = exports.SendConsultAddResponse = exports.SendConsultAddHeaders = exports.SendConsultAddParams = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../commons/dtos");
const user_dto_1 = require("../../user/dto/user.dto");
const consult_entitiy_1 = require("../entities/consult.entitiy");
class SendConsultAddParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendConsultAddParams.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(consult_entitiy_1.CONSULT_CONSULT),
    __metadata("design:type", Number)
], SendConsultAddParams.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendConsultAddParams.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendConsultAddParams.prototype, "detail", void 0);
exports.SendConsultAddParams = SendConsultAddParams;
class SendConsultAddHeaders extends user_dto_1.MeInputDto {
}
exports.SendConsultAddHeaders = SendConsultAddHeaders;
class SendConsultAddResponse extends SendConsultAddParams {
}
exports.SendConsultAddResponse = SendConsultAddResponse;
class ConsultListPagination extends dtos_1.PaginationDto {
}
exports.ConsultListPagination = ConsultListPagination;
class ConsultListHeaders extends user_dto_1.MeInputDto {
}
exports.ConsultListHeaders = ConsultListHeaders;
class DoneConsultParams {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DoneConsultParams.prototype, "no", void 0);
exports.DoneConsultParams = DoneConsultParams;
class DoneConsultResponse extends SendConsultAddParams {
}
exports.DoneConsultResponse = DoneConsultResponse;
//# sourceMappingURL=consult.dto.js.map