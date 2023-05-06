import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@notionhq/client';
import { IsArray, IsString } from 'class-validator';

export class NotionInsertLocationParams {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsArray()
  keywords: string[];

  @ApiProperty()
  @IsArray()
  departments: string[];

  @ApiProperty()
  @IsString()
  userName: string;
}
export class NotionService {
  constructor() {}

  async notionInsertLocation({
    name,
    address,
    keywords,
    departments,
    userName,
  }: NotionInsertLocationParams): Promise<boolean> {
    try {
      const notion = new Client({ auth: process.env.NOTION_API_KEY });
      await notion.pages.create({
        parent: {
          database_id: process.env.NOTION_LOCATION_REGISTRATION,
        },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          address: {
            rich_text: [
              {
                text: {
                  content: address,
                },
              },
            ],
          },
          keywords: {
            multi_select: keywords.map((keyword) => ({
              name: keyword,
            })),
          },
          departments: {
            multi_select: departments.map((department) => ({
              name: department,
            })),
          },
          userName: {
            rich_text: [
              {
                text: {
                  content: userName,
                },
              },
            ],
          },
        },
      });
      return true;
    } catch (e) {
      throw e;
    }
  }
}
