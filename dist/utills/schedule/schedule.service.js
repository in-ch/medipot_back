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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const alarm_entitiy_1 = require("../../alarm/entities/alarm.entitiy");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
const typeorm_2 = require("typeorm");
let ScheduleService = class ScheduleService {
    constructor(alarms, users) {
        this.alarms = alarms;
        this.users = users;
    }
    async handleCron() {
        try {
            const ALARMS = await this.alarms
                .createQueryBuilder('alarm')
                .select('DISTINCT alarm.user_id', 'user_id')
                .where('alarm.deletedAt IS NULL')
                .getRawMany();
            ALARMS.map(async (ALARM) => {
                const count = await this.alarms
                    .createQueryBuilder('alarm')
                    .select('alarm.type', 'type')
                    .addSelect('COUNT(*)', 'count')
                    .where('alarm.user_id = :userId', { userId: ALARM.user_id })
                    .andWhere('alarm.type IN (:...types)', {
                    types: [
                        alarm_entitiy_1.ALARM_TYPE.chat,
                        alarm_entitiy_1.ALARM_TYPE.comment,
                        alarm_entitiy_1.ALARM_TYPE.commentToComment,
                        alarm_entitiy_1.ALARM_TYPE.like,
                    ],
                })
                    .groupBy('alarm.type')
                    .getRawMany();
                const User = await this.users.findOne({
                    where: {
                        no: ALARM.user_id,
                    },
                    select: ['nickname'],
                });
                console.log(`${User.nickname}님! 2시간 동안 총 ${count[0]?.count || 0}개의 좋아요, ${count[1]?.count || 0}개의 댓글, ${count[2]?.count || 0}개의 대댓글, ${count[3]?.count || 0}개의 채팅을 받으셨습니다.`);
                await this.alarms.delete({ user: { no: ALARM.user_id } });
            });
        }
        catch (e) {
            console.error(`Alarm API Error : ${e}`);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('10 * * * * *', { timeZone: 'Asia/Seoul' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleService.prototype, "handleCron", null);
ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alarm_entitiy_1.Alarm)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map