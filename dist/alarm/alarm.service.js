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
exports.AlarmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const typeorm_2 = require("typeorm");
const alarm_entitiy_1 = require("./entities/alarm.entitiy");
let AlarmService = class AlarmService {
    constructor(alarms, users) {
        this.alarms = alarms;
        this.users = users;
    }
    async addAlarm(payload) {
        try {
            const User = await this.users.findOne({
                where: {
                    no: payload.userNo,
                },
            });
            this.alarms.save(this.alarms.create({
                user: User,
                type: payload.type,
            }));
        }
        catch (e) {
            console.error(`Create Alarm Error ${e}`);
        }
    }
};
AlarmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alarm_entitiy_1.Alarm)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AlarmService);
exports.AlarmService = AlarmService;
//# sourceMappingURL=alarm.service.js.map