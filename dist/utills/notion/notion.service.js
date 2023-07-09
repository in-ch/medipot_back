"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionService = void 0;
const client_1 = require("@notionhq/client");
class NotionService {
    constructor() { }
    async notionInsertLocation({ name, address, keywords, departments, userName, }) {
        try {
            const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
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
        }
        catch (e) {
            throw e;
        }
    }
    async notionInsertConsult({ name, type, detail, phone, userName, }) {
        try {
            const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
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
        }
        catch (e) {
            throw e;
        }
    }
    async notionInsertReport({ contentId, tag, reportUserName, reportedUserName, detail, }) {
        try {
            const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
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
        }
        catch (e) {
            throw e;
        }
    }
    async notionInsertQuestion({ name, phone, location, locationUser, locationPhone, }) {
        try {
            const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
            await notion.pages.create({
                parent: {
                    database_id: process.env.NOTION_LOCATION_INQUIRY_REGISTRATION,
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
                    phone: {
                        rich_text: [
                            {
                                text: {
                                    content: phone,
                                },
                            },
                        ],
                    },
                    location: {
                        rich_text: [
                            {
                                text: {
                                    content: location,
                                },
                            },
                        ],
                    },
                    locationUser: {
                        rich_text: [
                            {
                                text: {
                                    content: locationUser,
                                },
                            },
                        ],
                    },
                    locationPhone: {
                        rich_text: [
                            {
                                text: {
                                    content: locationPhone,
                                },
                            },
                        ],
                    },
                },
            });
            return true;
        }
        catch (e) {
            throw e;
        }
    }
    async notionRequestGrant({ name, license }) {
        try {
            const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
            console.log(name);
            await notion.pages.create({
                parent: {
                    database_id: process.env.NOTION_REQUEST_LICENSE,
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
                    license: {
                        url: license,
                    },
                    isDone: {
                        select: {
                            name: 'isProcessing',
                        },
                    },
                },
            });
            return true;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.NotionService = NotionService;
//# sourceMappingURL=notion.service.js.map