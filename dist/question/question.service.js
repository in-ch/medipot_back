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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entitiy_1 = require("./entities/question.entitiy");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const location_entitiy_1 = require("../location/entities/location.entitiy");
const jwt_1 = require("@nestjs/jwt");
const notion_service_1 = require("../utills/notion/notion.service");
let QuestionService = class QuestionService {
    constructor(questions, users, locations, jwtService, notionService) {
        this.questions = questions;
        this.users = users;
        this.locations = locations;
        this.jwtService = jwtService;
        this.notionService = notionService;
    }
    async addDetail(payload, header) {
        const { locationNo } = payload;
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const user = await this.users.findOne({
                where: {
                    no,
                },
                select: ['no', 'nickname', 'phone'],
            });
            if (!user.no) {
                throw new common_1.NotFoundException('유저 인증에 실패했습니다.');
            }
            const location = await this.locations.findOne({
                where: {
                    no: locationNo,
                },
                relations: ['user'],
            });
            if (!location.no) {
                throw new common_1.NotFoundException('삭제된 매물입니다.');
            }
            const locationUser = await this.users.findOne({
                where: {
                    no: location.user.no,
                },
                select: ['phone', 'nickname'],
            });
            const newQuestion = {
                user,
                location,
                userNo: no,
                locationNo,
            };
            this.questions.save(this.questions.create(newQuestion));
            await this.notionService.notionInsertQuestion({
                name: user.nickname,
                phone: user.phone,
                location: location.address,
                locationUser: locationUser.nickname,
                locationPhone: locationUser.phone,
            });
            return {
                statusCode: 200,
            };
        }
        catch (e) {
            console.error(`Add Question API Error: ${e}`);
            throw e;
        }
    }
    async getQuestions(query, header) {
        const { limit, page } = query;
        const { authorization } = header;
        try {
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const questions = await this.questions.find({
                take: limit || 10,
                skip: page * limit || 0,
                where: {
                    user: {
                        no,
                    },
                },
                relations: ['location'],
            });
            const totalCount = questions.length;
            return {
                totalCount,
                statusCode: 200,
                data: questions,
            };
        }
        catch (e) {
            console.error(`getQuestions API Error: ${e}`);
            throw e;
        }
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entitiy_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(location_entitiy_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        notion_service_1.NotionService])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map