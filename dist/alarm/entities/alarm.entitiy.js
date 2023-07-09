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
exports.Alarm = exports.ALARM_TYPE = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_entity_1 = require("../../commons/entities/common.entity");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
const typeorm_1 = require("typeorm");
var ALARM_TYPE;
(function (ALARM_TYPE) {
    ALARM_TYPE["comment"] = "COMMENT";
    ALARM_TYPE["commentToComment"] = "COMMENT_TO_COMMENT";
    ALARM_TYPE["like"] = "LIKE";
    ALARM_TYPE["chat"] = "CHAT";
})(ALARM_TYPE = exports.ALARM_TYPE || (exports.ALARM_TYPE = {}));
let Alarm = class Alarm extends common_entity_1.CommonEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.from_chats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Alarm.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ comment: '알림 유형' }),
    __metadata("design:type", String)
], Alarm.prototype, "type", void 0);
Alarm = __decorate([
    (0, typeorm_1.Entity)()
], Alarm);
exports.Alarm = Alarm;
//# sourceMappingURL=alarm.entitiy.js.map