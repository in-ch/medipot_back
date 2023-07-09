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
exports.Consult = exports.CONSULT_CONSULT = void 0;
const common_entity_1 = require("../../commons/entities/common.entity");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
const typeorm_1 = require("typeorm");
var CONSULT_CONSULT;
(function (CONSULT_CONSULT) {
    CONSULT_CONSULT[CONSULT_CONSULT["\uC0AC\uC5C5 \uC81C\uD734"] = 0] = "\uC0AC\uC5C5 \uC81C\uD734";
    CONSULT_CONSULT[CONSULT_CONSULT["\uC785\uC9C0 \uBB38\uC758"] = 1] = "\uC785\uC9C0 \uBB38\uC758";
    CONSULT_CONSULT[CONSULT_CONSULT["\uC785\uC9C0 \uB4F1\uB85D"] = 2] = "\uC785\uC9C0 \uB4F1\uB85D";
    CONSULT_CONSULT[CONSULT_CONSULT["\uAE30\uD0C0"] = 3] = "\uAE30\uD0C0";
})(CONSULT_CONSULT = exports.CONSULT_CONSULT || (exports.CONSULT_CONSULT = {}));
let Consult = class Consult extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, comment: '문의자 이름' }),
    __metadata("design:type", String)
], Consult.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, comment: '입점 문의 종류' }),
    __metadata("design:type", Number)
], Consult.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, comment: '문의자 번호' }),
    __metadata("design:type", String)
], Consult.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 9999, comment: '문의 내용' }),
    __metadata("design:type", String)
], Consult.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', comment: '문의 완료', default: false }),
    __metadata("design:type", Boolean)
], Consult.prototype, "isDone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.consult, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Consult.prototype, "user", void 0);
Consult = __decorate([
    (0, typeorm_1.Entity)()
], Consult);
exports.Consult = Consult;
//# sourceMappingURL=consult.entitiy.js.map