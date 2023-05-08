import { Client } from '@notionhq/client';
import {
  NotionInsertConsultParams,
  NotionInsertLocationParams,
  NotionInsertReportParams,
} from './dto/notion.dto';

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

  async notionInsertConsult({
    name,
    type,
    detail,
    phone,
    userName,
  }: NotionInsertConsultParams): Promise<boolean> {
    try {
      const notion = new Client({ auth: process.env.NOTION_API_KEY });
      await notion.pages.create({
        parent: {
          database_id: process.env.NOTION_CONSULT_REGISTRATION,
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
          type: {
            select: {
              name: type,
            },
          },
          detail: {
            rich_text: [
              {
                text: {
                  content: detail,
                },
              },
            ],
          },
          phone: {
            rich_text: [
              {
                text: {
                  content: phone,
                },
              },
            ],
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

  async notionInsertReport({
    contentId,
    tag,
    reportUserName,
    reportedUserName,
    detail,
  }: NotionInsertReportParams): Promise<boolean> {
    try {
      const notion = new Client({ auth: process.env.NOTION_API_KEY });
      await notion.pages.create({
        parent: {
          database_id: process.env.NOTION_REPORT_REGISTRATION,
        },
        properties: {
          detail: {
            title: [
              {
                text: {
                  content: detail,
                },
              },
            ],
          },
          contentId: {
            rich_text: [
              {
                text: {
                  content: contentId,
                },
              },
            ],
          },
          tag: {
            select: {
              name: tag,
            },
          },
          reportUserName: {
            rich_text: [
              {
                text: {
                  content: reportUserName,
                },
              },
            ],
          },
          reportedUserName: {
            rich_text: [
              {
                text: {
                  content: reportedUserName,
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
