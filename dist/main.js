"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const swagger_1 = require("@nestjs/swagger");
const chalk = require('chalk');
const swagger_config = new swagger_1.DocumentBuilder()
    .setTitle('Medipot SYSTEM API')
    .setDescription('Medipot SYSTEM 명세서')
    .setVersion('v1.0.0')
    .build();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: false });
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config);
    swagger_1.SwaggerModule.setup('inch', app, document);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(bodyParser.json({ limit: '500mb' }));
    app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
    await app.listen(process.env.PORT);
    console.log(chalk.hex('#000000').bold('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉'));
    console.log(chalk.hex('#FFB638').bold('🌠                                       🌠'));
    console.log(chalk.hex('#FFB638').bold('🚀    Welcome!! Medipot API Service      🚀'));
    console.log(chalk.hex('#9900FF').bold('🔖    API 주소: http://localhost:4000    🔖'));
    console.log(chalk.hex('#B6D7A8').bold('📝    명세서: http://localhost:4000/inch 📝'));
    console.log(chalk.hex('#B6D7A8').bold('🎊                                       🎊'));
    console.log(chalk.hex('#000000').bold('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉'));
}
bootstrap();
//# sourceMappingURL=main.js.map