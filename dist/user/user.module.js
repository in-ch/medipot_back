"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_entitiy_1 = require("./entities/user.entitiy");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const writing_1 = require("../writing/entities/writing");
const doctorGrant_entitiy_1 = require("./entities/doctorGrant.entitiy");
const notion_service_1 = require("../utills/notion/notion.service");
const admin_user_entitiy_1 = require("../admin/entities/admin-user.entitiy");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entitiy_1.User, writing_1.Writing, doctorGrant_entitiy_1.UserGrantRequest, admin_user_entitiy_1.AdminUser]),
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
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy, notion_service_1.NotionService],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map