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
exports.Chat = exports.MESSAGE_TYPE = void 0;
const common_entity_1 = require("../../commons/entities/common.entity");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
const typeorm_1 = require("typeorm");
var MESSAGE_TYPE;
(function (MESSAGE_TYPE) {
    MESSAGE_TYPE["message"] = "MESSAGE";
    MESSAGE_TYPE["image"] = "IMAGE";
})(MESSAGE_TYPE = exports.MESSAGE_TYPE || (exports.MESSAGE_TYPE = {}));
let Chat = class Chat extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1050, comment: '메시지 내용', nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', comment: '채팅 메시지를 읽었는지 여부', default: false }),
    __metadata("design:type", Boolean)
], Chat.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', comment: '메시지 타입' }),
    __metadata("design:type", String)
], Chat.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.from_chats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'from_user_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Chat.prototype, "fromUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.to_chats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'to_user_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Chat.prototype, "toUser", void 0);
Chat = __decorate([
    (0, typeorm_1.Entity)()
], Chat);
exports.Chat = Chat;
//# sourceMappingURL=chat.entitiy.js.map