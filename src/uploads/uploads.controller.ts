import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';

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

@ApiTags('이미지 업로드')
@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
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
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
