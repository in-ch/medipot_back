"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_module_1 = require("./typeorm/typeorm.module");
const config_module_1 = require("./config/config.module");
const location_module_1 = require("./location/location.module");
const user_module_1 = require("./user/user.module");
const uploads_module_1 = require("./uploads/uploads.module");
const kakao_module_1 = require("./kakao/kakao.module");
const email_module_1 = require("./email/email.module");
const auth_module_1 = require("./auth/auth.module");
const question_module_1 = require("./question/question.module");
const consult_module_1 = require("./consult/consult.module");
const writing_module_1 = require("./writing/writing.module");
const like_module_1 = require("./like/like.module");
const reply_module_1 = require("./reply/reply.module");
const report_module_1 = require("./report/report.module");
const nested_reply_module_1 = require("./nested-reply/nested-reply.module");
const chat_module_1 = require("./chat/chat.module");
const admin_module_1 = require("./admin/admin.module");
const schedule_1 = require("@nestjs/schedule");
const schedule_service_1 = require("./utills/schedule/schedule.service");
const alarm_module_1 = require("./alarm/alarm.module");
const naver_module_1 = require("./naver/naver.module");
const alarm_entitiy_1 = require("./alarm/entities/alarm.entitiy");
const typeorm_1 = require("@nestjs/typeorm");
const user_entitiy_1 = require("./user/entities/user.entitiy");
const like_location_module_1 = require("./like-location/like-location.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigAppModule,
            typeorm_module_1.TypeormModule,
            location_module_1.LocationModule,
            user_module_1.UserModule,
            uploads_module_1.UploadsModule,
            kakao_module_1.KakaoModule,
            naver_module_1.NaverModule,
            email_module_1.EmailModule,
            auth_module_1.AuthModule,
            question_module_1.QuestionModule,
            consult_module_1.ConsultModule,
            writing_module_1.WritingModule,
            like_module_1.LikeModule,
            reply_module_1.ReplyModule,
            report_module_1.ReportModule,
            nested_reply_module_1.NestedReplyModule,
            chat_module_1.ChatModule,
            admin_module_1.AdminModule,
            alarm_module_1.AlarmModule,
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([alarm_entitiy_1.Alarm, user_entitiy_1.User]),
            like_location_module_1.LikeLocationModule,
        ],
        controllers: [],
        providers: [schedule_service_1.ScheduleService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map