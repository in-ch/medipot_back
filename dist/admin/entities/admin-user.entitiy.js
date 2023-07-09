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
exports.AdminUser = exports.grant = void 0;
const typeorm_1 = require("typeorm");
var grant;
(function (grant) {
    grant[grant["ADMIN"] = 0] = "ADMIN";
    grant[grant["USER"] = 1] = "USER";
})(grant = exports.grant || (exports.grant = {}));
let AdminUser = class AdminUser extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminUser.prototype, "no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, comment: '아이디' }),
    __metadata("design:type", String)
], AdminUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '패스워드', select: false }),
    __metadata("design:type", String)
], AdminUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '유저 이름' }),
    __metadata("design:type", String)
], AdminUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: grant, type: 'enum', name: 'grant', comment: '권한', select: false }),
    __metadata("design:type", Number)
], AdminUser.prototype, "grant", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '엑세스 토큰', default: '', select: false }),
    __metadata("design:type", String)
], AdminUser.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '리프레쉬 토큰', default: '', select: false }),
    __metadata("design:type", String)
], AdminUser.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_at', comment: '생성일' }),
    __metadata("design:type", Date)
], AdminUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_at', comment: '수정일' }),
    __metadata("design:type", Date)
], AdminUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'delete_at', comment: '삭제일' }),
    __metadata("design:type", Date)
], AdminUser.prototype, "deletedAt", void 0);
AdminUser = __decorate([
    (0, typeorm_1.Entity)()
], AdminUser);
exports.AdminUser = AdminUser;
//# sourceMappingURL=admin-user.entitiy.js.map