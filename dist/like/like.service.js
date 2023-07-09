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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const alarm_service_1 = require("../alarm/alarm.service");
const alarm_entitiy_1 = require("../alarm/entities/alarm.entitiy");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const writing_1 = require("../writing/entities/writing");
const typeorm_2 = require("typeorm");
const like_1 = require("./dto/like");
const like_entitiy_1 = require("./entities/like.entitiy");
let LikeService = class LikeService {
    constructor(likes, users, writings, jwtService, alarmService) {
        this.likes = likes;
        this.users = users;
        this.writings = writings;
        this.jwtService = jwtService;
        this.alarmService = alarmService;
    }
    async like(payload, header) {
        const { writingNo } = payload;
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const Like = await this.likes.findOne({
                where: {
                    user: {
                        no,
                    },
                    writing: {
                        no: writingNo,
                    },
                },
                relations: ['user', 'writing'],
                loadRelationIds: true,
            });
            if (Like?.no) {
                throw new common_1.ConflictException('이미 좋아요를 했습니다.');
            }
            else {
                const User = await this.users.findOne({
                    where: {
                        no,
                    },
                });
                const Writing = await this.writings.findOne({
                    where: {
                        no: writingNo,
                    },
                    relations: ['user'],
                    loadRelationIds: true,
                });
                await this.likes.save(this.likes.create({
                    user: User,
                    writing: Writing,
                }));
                if (no !== Writing.user.no)
                    await this.alarmService.addAlarm({
                        userNo: Writing.user.no,
                        type: alarm_entitiy_1.ALARM_TYPE.like,
                    });
                return {
                    statusCode: 200,
                    data: true,
                };
            }
        }
        catch (e) {
            console.error(`좋아요 api 오류: ${e}`);
            throw e;
        }
    }
    async unlike(payload, header) {
        const { writingNo } = payload;
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const Like = await this.likes.findOne({
                where: {
                    user: {
                        no,
                    },
                    writing: {
                        no: writingNo,
                    },
                },
                relations: ['user', 'writing'],
                loadRelationIds: true,
            });
            if (!Like?.no) {
                throw new common_1.ConflictException('이미 삭제한 좋아요입니다.');
            }
            else {
                this.likes.delete(Like.no);
                return {
                    statusCode: 200,
                    data: true,
                };
            }
        }
        catch (e) {
            console.error(`unlike api error: ${e}`);
            throw e;
        }
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_1.LikeCrudDto,
        like_1.LikeHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeService.prototype, "like", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_1.UnlikeCrudDto,
        like_1.UnlikeHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeService.prototype, "unlike", null);
LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entitiy_1.Like)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(writing_1.Writing)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        alarm_service_1.AlarmService])
], LikeService);
exports.LikeService = LikeService;
//# sourceMappingURL=like.service.js.map