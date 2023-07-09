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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../commons/entities/common.entity");
const nestedReply_entitiy_1 = require("../../nested-reply/entities/nestedReply.entitiy");
const reply_entity_1 = require("../../reply/entities/reply.entity");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
const writing_1 = require("../../writing/entities/writing");
let Report = class Report extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.report, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_report_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Report.prototype, "user_report", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.reported, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_reported_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Report.prototype, "user_reported", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => writing_1.Writing, (writing) => writing.reported, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'writing_id' }),
    __metadata("design:type", writing_1.Writing)
], Report.prototype, "writing", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => reply_entity_1.Reply, (reply) => reply.reported, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'reply_id' }),
    __metadata("design:type", reply_entity_1.Reply)
], Report.prototype, "reply", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => nestedReply_entitiy_1.NestedReply, (nestedReply) => nestedReply.reported, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nestedReply_id' }),
    __metadata("design:type", nestedReply_entitiy_1.NestedReply)
], Report.prototype, "nestedReply", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', comment: '처리 여부', default: false }),
    __metadata("design:type", Boolean)
], Report.prototype, "isProcessing", void 0);
Report = __decorate([
    (0, typeorm_1.Entity)()
], Report);
exports.Report = Report;
//# sourceMappingURL=report.entity.js.map