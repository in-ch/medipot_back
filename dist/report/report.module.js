"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const nestedReply_entitiy_1 = require("../nested-reply/entities/nestedReply.entitiy");
const reply_entity_1 = require("../reply/entities/reply.entity");
const user_entitiy_1 = require("../user/entities/user.entitiy");
const notion_service_1 = require("../utills/notion/notion.service");
const writing_1 = require("../writing/entities/writing");
const report_entity_1 = require("./entities/report.entity");
const report_controller_1 = require("./report.controller");
const report_service_1 = require("./report.service");
let ReportModule = class ReportModule {
};
ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([writing_1.Writing, user_entitiy_1.User, report_entity_1.Report, reply_entity_1.Reply, nestedReply_entitiy_1.NestedReply]),
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
        controllers: [report_controller_1.ReportController],
        providers: [report_service_1.ReportService, notion_service_1.NotionService],
    })
], ReportModule);
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map