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
exports.Writing = void 0;
const typeorm_1 = require("typeorm");
const like_entitiy_1 = require("../../like/entities/like.entitiy");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
const reply_entity_1 = require("../../reply/entities/reply.entity");
const report_entity_1 = require("../../report/entities/report.entity");
const common_entity_1 = require("../../commons/entities/common.entity");
let Writing = class Writing extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '글 제목' }),
    __metadata("design:type", String)
], Writing.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '글 내용' }),
    __metadata("design:type", String)
], Writing.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, comment: '글 태그들' }),
    __metadata("design:type", Array)
], Writing.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, comment: '이미지들' }),
    __metadata("design:type", Array)
], Writing.prototype, "imgs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.writing, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Writing.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => like_entitiy_1.Like, (like) => like.writing),
    __metadata("design:type", Array)
], Writing.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => reply_entity_1.Reply, (reply) => reply.writing),
    __metadata("design:type", Array)
], Writing.prototype, "reply", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => report_entity_1.Report, (report) => report.writing),
    __metadata("design:type", Array)
], Writing.prototype, "reported", void 0);
Writing = __decorate([
    (0, typeorm_1.Entity)()
], Writing);
exports.Writing = Writing;
//# sourceMappingURL=writing.js.map