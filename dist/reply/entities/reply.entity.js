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
exports.Reply = void 0;
const common_entity_1 = require("../../commons/entities/common.entity");
const nestedReply_entitiy_1 = require("../../nested-reply/entities/nestedReply.entitiy");
const report_entity_1 = require("../../report/entities/report.entity");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
const writing_1 = require("../../writing/entities/writing");
const typeorm_1 = require("typeorm");
let Reply = class Reply extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.like, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Reply.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => writing_1.Writing, (writing) => writing.like, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'writing_id' }),
    __metadata("design:type", writing_1.Writing)
], Reply.prototype, "writing", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => report_entity_1.Report, (report) => report.reply),
    __metadata("design:type", Array)
], Reply.prototype, "reported", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, comment: '댓글' }),
    __metadata("design:type", String)
], Reply.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => nestedReply_entitiy_1.NestedReply, (nestedReply) => nestedReply.reply),
    __metadata("design:type", Array)
], Reply.prototype, "nestedReply", void 0);
Reply = __decorate([
    (0, typeorm_1.Entity)()
], Reply);
exports.Reply = Reply;
//# sourceMappingURL=reply.entity.js.map