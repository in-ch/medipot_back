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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const question_1 = require("./dto/question");
const question_service_1 = require("./question.service");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    addDetail(payload, header) {
        return this.questionService.addDetail(payload, header);
    }
    getQuestion(request, header) {
        return this.questionService.getQuestions(request.query, header);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: question_1.QuestionCrudDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/detail/add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_1.QuestionCrudDto,
        question_1.QuestionHeaderDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "addDetail", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: question_1.QuestionListPagination }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, question_1.QuestionHeaderDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestion", null);
QuestionController = __decorate([
    (0, swagger_1.ApiTags)('문의'),
    (0, common_1.Controller)('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map