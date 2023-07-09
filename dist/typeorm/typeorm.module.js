"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const location_entitiy_1 = require("../location/entities/location.entitiy");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const auth_entitiy_1 = require("../auth/entities/auth.entitiy");
const question_entitiy_1 = require("../question/entities/question.entitiy");
const consult_entitiy_1 = require("../consult/entities/consult.entitiy");
const writing_1 = require("../writing/entities/writing");
const like_entitiy_1 = require("../like/entities/like.entitiy");
const reply_entity_1 = require("../reply/entities/reply.entity");
const report_entity_1 = require("../report/entities/report.entity");
const nestedReply_entitiy_1 = require("../nested-reply/entities/nestedReply.entitiy");
const chat_entitiy_1 = require("../chat/entities/chat.entitiy");
const admin_user_entitiy_1 = require("../admin/entities/admin-user.entitiy");
const alarm_entitiy_1 = require("../alarm/entities/alarm.entitiy");
const doctorGrant_entitiy_1 = require("../user/entities/doctorGrant.entitiy");
const like_location_entitiy_1 = require("../like-location/entities/like-location.entitiy");
const auth_phone_entitiy_1 = require("../auth/entities/auth-phone.entitiy");
const config_1 = require("@nestjs/config");
let TypeormModule = class TypeormModule {
};
TypeormModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: +process.env.DB_PORT,
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    synchronize: configService.get('NODE_ENV') !== 'prod',
                    logging: configService.get('NODE_ENV') !== 'prod',
                    entities: [
                        location_entitiy_1.Location,
                        admin_user_entitiy_1.AdminUser,
                        user_entitiy_1.User,
                        auth_entitiy_1.Auth,
                        question_entitiy_1.Question,
                        consult_entitiy_1.Consult,
                        writing_1.Writing,
                        like_entitiy_1.Like,
                        reply_entity_1.Reply,
                        report_entity_1.Report,
                        nestedReply_entitiy_1.NestedReply,
                        chat_entitiy_1.Chat,
                        alarm_entitiy_1.Alarm,
                        doctorGrant_entitiy_1.UserGrantRequest,
                        like_location_entitiy_1.LikeLocation,
                        auth_phone_entitiy_1.AuthPhone,
                    ],
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], TypeormModule);
exports.TypeormModule = TypeormModule;
//# sourceMappingURL=typeorm.module.js.map