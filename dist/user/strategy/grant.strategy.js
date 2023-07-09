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
exports.GrantGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entitiy_1 = require("../entities/user.entitiy");
let GrantGuard = class GrantGuard {
    constructor(jwtService, users) {
        this.jwtService = jwtService;
        this.users = users;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return false;
        }
        const UnSignToken = await this.jwtService.verify(authorizationHeader.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const User = await this.users.findOne({
            where: {
                no: UnSignToken.no,
            },
            select: ['grant'],
        });
        if (User.grant !== user_entitiy_1.UserGrant.DOCTOR) {
            throw new common_1.HttpException('의사 권한이 없습니다.', common_1.HttpStatus.FORBIDDEN);
        }
        return User.grant === user_entitiy_1.UserGrant.DOCTOR;
    }
};
GrantGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(jwt_1.JwtService)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], GrantGuard);
exports.GrantGuard = GrantGuard;
//# sourceMappingURL=grant.strategy.js.map