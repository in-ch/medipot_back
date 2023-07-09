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
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const AWS = require("aws-sdk");
const sharp = require('sharp');
const BUCKET_NAME = 'medipot-uploads';
const generateRandomString = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = year + '_' + month + '_' + day;
    return `${dateStr}_${result}`;
};
let UploadsController = class UploadsController {
    async uploadFile(file) {
        AWS.config.update({
            credentials: {
                accessKeyId: process.env.S3_ACESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
            },
        });
        const Image = await sharp(file.buffer, { failOnError: false })
            .withMetadata()
            .resize(200)
            .jpeg({ mozjpeg: true })
            .png()
            .toBuffer();
        try {
            const objectName = `${generateRandomString(10)}.png`;
            await new AWS.S3()
                .putObject({
                Body: Image,
                Bucket: BUCKET_NAME,
                Key: objectName,
                ContentEncoding: 'base64',
                ContentType: 'image/png',
                ACL: 'public-read',
            })
                .promise();
            const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
            return { url };
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadFile", null);
UploadsController = __decorate([
    (0, swagger_1.ApiTags)('이미지 업로드'),
    (0, common_1.Controller)('uploads')
], UploadsController);
exports.UploadsController = UploadsController;
//# sourceMappingURL=uploads.controller.js.map