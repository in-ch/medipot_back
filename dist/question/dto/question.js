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
exports.QuestionListPagination = exports.QuestionHeaderDto = exports.QuestionOutputCrudDto = exports.QuestionCrudDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../commons/dtos");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
class QuestionCrudDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionCrudDto.prototype, "locationNo", void 0);
exports.QuestionCrudDto = QuestionCrudDto;
class QuestionOutputCrudDto extends (0, mapped_types_1.PickType)(QuestionCrudDto, ['locationNo']) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_entitiy_1.User)
], QuestionOutputCrudDto.prototype, "user", void 0);
exports.QuestionOutputCrudDto = QuestionOutputCrudDto;
class QuestionHeaderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionHeaderDto.prototype, "authorization", void 0);
exports.QuestionHeaderDto = QuestionHeaderDto;
class QuestionListPagination extends dtos_1.PaginationDto {
}
exports.QuestionListPagination = QuestionListPagination;
//# sourceMappingURL=question.js.map