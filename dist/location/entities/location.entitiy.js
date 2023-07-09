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
exports.Location = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../commons/entities/common.entity");
const question_entitiy_1 = require("../../question/entities/question.entitiy");
const user_entitiy_1 = require("../../user/entities/user.entitiy");
const like_location_entitiy_1 = require("../../like-location/entities/like-location.entitiy");
let Location = class Location extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, comment: '입지 이름' }),
    __metadata("design:type", String)
], Location.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '임대보증금' }),
    __metadata("design:type", Number)
], Location.prototype, "deposit", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '월 임대보증금' }),
    __metadata("design:type", Number)
], Location.prototype, "depositMonly", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '권리금' }),
    __metadata("design:type", Number)
], Location.prototype, "premium", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '관리비' }),
    __metadata("design:type", Number)
], Location.prototype, "manageCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '중개수수료', default: 0, nullable: true }),
    __metadata("design:type", Number)
], Location.prototype, "brokerage", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, comment: '진료과들' }),
    __metadata("design:type", Array)
], Location.prototype, "departments", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { comment: '키워드', array: true }),
    __metadata("design:type", Array)
], Location.prototype, "keywords", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '전용 면적' }),
    __metadata("design:type", Number)
], Location.prototype, "dedicatedArea", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '공급 면적' }),
    __metadata("design:type", Number)
], Location.prototype, "supplyArea", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, comment: '추가 정보', default: '' }),
    __metadata("design:type", String)
], Location.prototype, "etc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, comment: '입지 주소' }),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, comment: '상세 주소' }),
    __metadata("design:type", String)
], Location.prototype, "detailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2, comment: '주차 댓수', default: '미정' }),
    __metadata("design:type", Number)
], Location.prototype, "parkingCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '사용 승인일', default: '' }),
    __metadata("design:type", String)
], Location.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', comment: '상세 설명' }),
    __metadata("design:type", String)
], Location.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { comment: '이미지들', array: true }),
    __metadata("design:type", Array)
], Location.prototype, "imgs", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { comment: '위도', default: 0 }),
    __metadata("design:type", Number)
], Location.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { comment: '경도', default: 0 }),
    __metadata("design:type", Number)
], Location.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '승인 여부', default: false }),
    __metadata("design:type", Boolean)
], Location.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => like_location_entitiy_1.LikeLocation, (like) => like.location),
    __metadata("design:type", Array)
], Location.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_) => question_entitiy_1.Question, (question) => question.location),
    __metadata("design:type", Array)
], Location.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_) => user_entitiy_1.User, (user) => user.location, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entitiy_1.User)
], Location.prototype, "user", void 0);
Location = __decorate([
    (0, typeorm_1.Entity)()
], Location);
exports.Location = Location;
//# sourceMappingURL=location.entitiy.js.map