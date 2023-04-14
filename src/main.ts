import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

const chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  await app.listen(4000);

  console.log(chalk.hex('#000000').bold('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉'));
  console.log(chalk.hex('#FFB638').bold('🌠                                       🌠'));
  console.log(chalk.hex('#FFB638').bold('🚀    Welcome!! Medipot API Service      🚀'));
  console.log(chalk.hex('#9900FF').bold('🔖    API 주소: http://localhost:4000    🔖'));
  console.log(chalk.hex('#B6D7A8').bold('📝    명세서: http://localhost:4000/api  📝'));
  console.log(chalk.hex('#B6D7A8').bold('🎊                                       🎊'));
  console.log(chalk.hex('#000000').bold('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉'));
}
bootstrap();
