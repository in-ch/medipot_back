import { NotionInsertConsultParams, NotionInsertLocationParams, NotionInsertQuestionParams, NotionInsertReportParams, NotionRequestGrantParams } from './dto/notion.dto';
export declare class NotionService {
    constructor();
    notionInsertLocation({ name, address, keywords, departments, userName, }: NotionInsertLocationParams): Promise<boolean>;
    notionInsertConsult({ name, type, detail, phone, userName, }: NotionInsertConsultParams): Promise<boolean>;
    notionInsertReport({ contentId, tag, reportUserName, reportedUserName, detail, }: NotionInsertReportParams): Promise<boolean>;
    notionInsertQuestion({ name, phone, location, locationUser, locationPhone, }: NotionInsertQuestionParams): Promise<boolean>;
    notionRequestGrant({ name, license }: NotionRequestGrantParams): Promise<boolean>;
}
