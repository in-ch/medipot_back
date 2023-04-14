import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  await app.listen(4000);

  console.log(chalk.hex('#000000').bold('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉'));
  console.log(chalk.hex('#FFB638').bold('🌠                                       🌠'));
  console.log(chalk.hex('#FFB638').bold('🚀    Welcome!! Medipot API Service      🚀'));
  console.log(chalk.hex('#9900FF').bold('🔖    API 주소: http://localhost:4000    🔖'));
  console.log(chalk.hex('#B6D7A8').bold('📝    명세서: http://localhost:4000/inch 📝'));
  console.log(chalk.hex('#B6D7A8').bold('🎊                                       🎊'));
  console.log(chalk.hex('#000000').bold('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉'));
}
bootstrap();
