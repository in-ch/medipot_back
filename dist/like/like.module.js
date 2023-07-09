"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const like_entitiy_1 = require("./entities/like.entitiy");
const like_controller_1 = require("./like.controller");
const like_service_1 = require("./like.service");
const writing_1 = require("../writing/entities/writing");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const alarm_service_1 = require("../alarm/alarm.service");
const alarm_entitiy_1 = require("../alarm/entities/alarm.entitiy");
let LikeModule = class LikeModule {
};
LikeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([like_entitiy_1.Like, writing_1.Writing, user_entitiy_1.User, alarm_entitiy_1.Alarm]),
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
        controllers: [like_controller_1.LikeController],
        providers: [like_service_1.LikeService, alarm_service_1.AlarmService],
    })
], LikeModule);
exports.LikeModule = LikeModule;
//# sourceMappingURL=like.module.js.map