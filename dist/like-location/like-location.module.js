"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeLocationModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const location_entitiy_1 = require("../location/entities/location.entitiy");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const like_location_entitiy_1 = require("./entities/like-location.entitiy");
const like_location_controller_1 = require("./like-location.controller");
const like_location_service_1 = require("./like-location.service");
let LikeLocationModule = class LikeLocationModule {
};
LikeLocationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([like_location_entitiy_1.LikeLocation, location_entitiy_1.Location, user_entitiy_1.User]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('PRIVATE_KEY'),
                    signOptions: {
                        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                    },
                }),
            }),
        ],
        controllers: [like_location_controller_1.LikeLocationController],
        providers: [like_location_service_1.LikeLocationService],
    })
], LikeLocationModule);
exports.LikeLocationModule = LikeLocationModule;
//# sourceMappingURL=like-location.module.js.map