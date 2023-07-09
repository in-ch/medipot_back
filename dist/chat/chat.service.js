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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const alarm_service_1 = require("../alarm/alarm.service");
const alarm_entitiy_1 = require("../alarm/entities/alarm.entitiy");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const typeorm_2 = require("typeorm");
const chat_entitiy_1 = require("./entities/chat.entitiy");
let ChatService = class ChatService {
    constructor(chats, users, alarmService) {
        this.chats = chats;
        this.users = users;
        this.alarmService = alarmService;
    }
    async createMessage(message) {
        try {
            const { toUserNo, fromUserNo, type, data } = message;
            const FROM_USER = await this.users.findOne({
                where: {
                    no: Number(fromUserNo),
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            const TO_USER = await this.users.findOne({
                where: {
                    no: Number(toUserNo),
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            await this.alarmService.addAlarm({
                userNo: Number(toUserNo),
                type: alarm_entitiy_1.ALARM_TYPE.chat,
            });
            return {
                statusCode: 200,
                data: await this.chats.save(this.chats.create({
                    message: data,
                    fromUser: FROM_USER,
                    toUser: TO_USER,
                    type: type === chat_entitiy_1.MESSAGE_TYPE.message ? chat_entitiy_1.MESSAGE_TYPE.message : chat_entitiy_1.MESSAGE_TYPE.image,
                })),
            };
        }
        catch (e) {
            console.error(`create message API error ${e}`);
            throw e;
        }
    }
    async getMessages(request) {
        const { page, limit, toUserNo, fromUserNo } = request.query;
        try {
            const MESSAGES = await this.chats.find({
                where: [
                    {
                        toUser: {
                            no: Number(toUserNo),
                        },
                        fromUser: {
                            no: Number(fromUserNo),
                        },
                    },
                    {
                        toUser: {
                            no: Number(fromUserNo),
                        },
                        fromUser: {
                            no: Number(toUserNo),
                        },
                    },
                ],
                order: {
                    no: 'ASC',
                },
                take: Number(limit) || 100,
                skip: Number(page) * Number(limit) || 0,
                relations: ['toUser', 'fromUser'],
                loadRelationIds: true,
            });
            return {
                statusCode: 200,
                totalCount: MESSAGES.length,
                data: {
                    page: Number(page),
                    list: MESSAGES,
                },
            };
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entitiy_1.Chat)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        alarm_service_1.AlarmService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map