import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';

const sharp = require('sharp');

/**
 * @param num 문자열 길이
 * @description 인자로받은 문자열 길이만큼의 랜덤 문자열을 생성합니다.
 *              이때 날짜값도 앞에 추가합니다.
 * @returns {string} 랜덤 문자열
 */
const generateRandomString = (num: number): string => {
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

    try {
      const s3 = new AWS.S3();
      const imgSize = 700;

      // 이미지 리사이징 및 워터마크 적용
      const Image = await sharp(file.buffer, { failOnError: false })
        .withMetadata()
        .resize(imgSize)
        .jpeg({ mozjpeg: true })
        .png()
        .toBuffer();

      const watermarkedImage = await sharp(Image)
        .composite([{ input: process.env.WATERMARK_IMG, gravity: 'southeast' }])
        .resize({ width: imgSize })
        .toBuffer();

      const objectName = `${generateRandomString(10)}.png`;
      await s3
        .putObject({
          Body: watermarkedImage,
          Bucket: process.env.S3_BUCKET_NAME,
          Key: objectName,
          ContentType: 'image/png',
          ACL: 'public-read',
        })
        .promise();

      const url = `${process.env.CLOUD_FRONT}/${objectName}`;
      return { url };
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
