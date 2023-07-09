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
exports.LikeLocationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const location_entitiy_1 = require("../location/entities/location.entitiy");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const typeorm_2 = require("typeorm");
const like_location_1 = require("./dto/like-location");
const like_location_entitiy_1 = require("./entities/like-location.entitiy");
let LikeLocationService = class LikeLocationService {
    constructor(users, likeLocations, locations, jwtService) {
        this.users = users;
        this.likeLocations = likeLocations;
        this.locations = locations;
        this.jwtService = jwtService;
    }
    async likeLocation(payload, header) {
        const { locationNo } = payload;
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const LikeLocation = await this.likeLocations.findOne({
                where: {
                    user: {
                        no,
                    },
                    location: {
                        no: locationNo,
                    },
                },
                relations: ['user', 'location'],
                loadRelationIds: true,
            });
            if (LikeLocation?.no) {
                throw new common_1.ConflictException('이미 좋아요를 했습니다.');
            }
            else {
                const User = await this.users.findOne({
                    where: {
                        no,
                    },
                });
                const Location = await this.locations.findOne({
                    where: {
                        no: locationNo,
                    },
                });
                await this.likeLocations.save(this.likeLocations.create({
                    user: User,
                    location: Location,
                }));
                return {
                    statusCode: 200,
                    data: true,
                };
            }
        }
        catch (e) {
            console.error(`좋아요 api 오류: ${e}`);
            throw e;
        }
    }
    async unlikeLocation(payload, header) {
        const { locationNo } = payload;
        const { authorization } = header;
        const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
            secret: process.env.PRIVATE_KEY,
        });
        const { no } = UnSignToken;
        try {
            const LikeLocation = await this.likeLocations.findOne({
                where: {
                    user: {
                        no,
                    },
                    location: {
                        no: locationNo,
                    },
                },
                relations: ['user', 'location'],
                loadRelationIds: true,
            });
            if (!LikeLocation?.no) {
                throw new common_1.ConflictException('이미 삭제한 좋아요입니다.');
            }
            else {
                this.likeLocations.delete(LikeLocation.no);
                return {
                    statusCode: 200,
                    data: true,
                };
            }
        }
        catch (e) {
            console.error(`좋아요 api 오류: ${e}`);
            throw e;
        }
    }
    async getLikeLocations(header) {
        try {
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const likeLocations = await this.likeLocations.find({
                where: {
                    user: {
                        no,
                    },
                },
                relations: ['location'],
            });
            return {
                totalCount: likeLocations.length,
                statusCode: 200,
                data: likeLocations,
            };
        }
        catch (e) {
            console.error(`getLocation error: ${e}`);
            throw new common_1.BadRequestException('존재하지 않거나 잘못된 매물 정보를 요청하였습니다.');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_location_1.LikeLocationCrudDto,
        like_location_1.LikeLocationHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeLocationService.prototype, "likeLocation", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_location_1.UnlikeLocationCrudDto,
        like_location_1.UnlikeLocationHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeLocationService.prototype, "unlikeLocation", null);
__decorate([
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_location_1.GetLikeLocationsHeaderDto]),
    __metadata("design:returntype", Promise)
], LikeLocationService.prototype, "getLikeLocations", null);
LikeLocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(like_location_entitiy_1.LikeLocation)),
    __param(2, (0, typeorm_1.InjectRepository)(location_entitiy_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], LikeLocationService);
exports.LikeLocationService = LikeLocationService;
//# sourceMappingURL=like-location.service.js.map