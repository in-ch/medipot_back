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
exports.UserGrantRequest = void 0;
const common_entity_1 = require("../../commons/entities/common.entity");
const typeorm_1 = require("typeorm");
const user_entitiy_1 = require("./user.entitiy");
let UserGrantRequest = class UserGrantRequest extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 999, comment: '의사면허증 링크' }),
    __metadata("design:type", String)
], UserGrantRequest.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.userGrantRequest, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entitiy_1.User)
], UserGrantRequest.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', comment: '처리 완료 여부', default: false }),
    __metadata("design:type", Boolean)
], UserGrantRequest.prototype, "isDone", void 0);
UserGrantRequest = __decorate([
    (0, typeorm_1.Entity)()
], UserGrantRequest);
exports.UserGrantRequest = UserGrantRequest;
//# sourceMappingURL=doctorGrant.entitiy.js.map