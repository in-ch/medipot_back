"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const AWS = require("aws-sdk");
const NODEMAILER = require("nodemailer");
const common_1 = require("@nestjs/common");
let EmailService = class EmailService {
    async sendEmail(params) {
        try {
            const { to, subject, html } = params;
            AWS.config.update({
                credentials: {
                    accessKeyId: process.env.ROOT_ACCESS_KEY,
                    secretAccessKey: process.env.ROOT_SECRET_KEY,
                },
                region: process.env.AWS_REGION,
            });
            const transporter = NODEMAILER.createTransport({
                SES: new AWS.SES({
                    apiVersion: '2010-12-01',
                }),
            });
            transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to,
                subject,
                html,
            }, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            return {
                data: true,
                statusCode: 200,
            };
        }
        catch (e) {
            console.error(`SEND EMAIL ERROR ${e}`);
            throw e;
        }
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map