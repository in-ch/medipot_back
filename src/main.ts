import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { init as SentryInit } from '@sentry/node';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';

const chalk = require('chalk');
const swagger_config = new DocumentBuilder()
  .setTitle('Medipot SYSTEM API')
  .setDescription('Medipot SYSTEM 명세서')
  .setVersion('v1.0.0')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('inch', app, document);
  SentryInit({
    dsn: process.env.SENTRY_DSN,
  });

  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN, // 수정 필요한 도메인 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
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
