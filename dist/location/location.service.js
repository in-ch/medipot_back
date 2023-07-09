"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const location_entitiy_1 = require("./entities/location.entitiy");
const notion_service_1 = require("../utills/notion/notion.service");
const jwt_1 = require("@nestjs/jwt");
const user_entitiy_1 = require("../user/entities/user.entitiy");
let LocationService = class LocationService {
    constructor(locations, users, jwtService, notionService) {
        this.locations = locations;
        this.users = users;
        this.jwtService = jwtService;
        this.notionService = notionService;
    }
    async getLocation(query) {
        try {
            const { no } = query;
            const numberNo = Number(no);
            if (!isNaN(numberNo)) {
                const location = await this.locations.findOne({
                    where: {
                        no: Number(no),
                    },
                    relations: ['user'],
                });
                if (!location?.no) {
                    throw new common_1.BadRequestException('존재하지 않는 매물입니다.');
                }
                return {
                    statusCode: 200,
                    data: location,
                };
            }
        }
        catch (e) {
            console.error(`getLocation error: ${e}`);
            throw new common_1.BadRequestException('존재하지 않거나 잘못된 매물 정보를 요청하였습니다.');
        }
    }
    async getLocations(query) {
        const { limit, page } = query;
        try {
            const locations = await this.locations.find({
                take: limit || 10,
                skip: page * limit || 0,
            });
            const totalCount = locations.length;
            return {
                totalCount,
                statusCode: 200,
                data: locations,
            };
        }
        catch (e) {
            console.error(`getLocations API error: ${e}`);
            throw e;
        }
    }
    async getGeoLocations(query) {
        const { limit, page, zoom, lat, lng, deposit, depositMonly, manageCost, dedicatedArea, supplyArea, keywords, departmentsValue, text, } = query;
        const parseZoom = (zoom * 0.31) / 2;
        const depositArray = String(deposit).split(',');
        const depositMonlyArray = String(depositMonly).split(',');
        const manageCostArray = String(manageCost).split(',');
        const dedicatedAreaArray = String(dedicatedArea).split(',');
        const supplyAreaArray = String(supplyArea).split(',');
        const departmentsValueArray = String(departmentsValue).split(',');
        const keywordsArray = String(keywords).split(',');
        try {
            const locations = await this.locations.find({
                take: limit || 10,
                skip: page * limit || 0,
                where: [
                    {
                        lat: (0, typeorm_2.Between)(Number(lat) - Number(parseZoom), Number(lat) + Number(parseZoom)),
                        lng: (0, typeorm_2.Between)(Number(lng) - Number(parseZoom), Number(lng) + Number(parseZoom)),
                        deposit: (0, typeorm_2.Between)(Number(depositArray[0]) * Number(1000), Number(depositArray[1]) !== 100 ? Number(depositArray[1]) * Number(1000) : 2147483640),
                        depositMonly: (0, typeorm_2.Between)(Number(depositMonlyArray[0]) * Number(100), Number(depositMonlyArray[1]) !== 100
                            ? Number(depositMonlyArray[1]) * Number(100)
                            : 2147483640),
                        manageCost: (0, typeorm_2.Between)(Number(manageCostArray[0]) * Number(20), Number(manageCostArray[1]) !== 100
                            ? Number(manageCostArray[1]) * Number(20)
                            : 2147483640),
                        dedicatedArea: (0, typeorm_2.Between)(Number(dedicatedAreaArray[0]) * Number(20), Number(dedicatedAreaArray[1]) !== 100
                            ? Number(dedicatedAreaArray[1]) * Number(20)
                            : 2147483640),
                        supplyArea: (0, typeorm_2.Between)(Number(supplyAreaArray[0]) * Number(20), Number(supplyAreaArray[1]) !== 100
                            ? Number(supplyAreaArray[1]) * Number(20)
                            : 2147483640),
                        departments: (0, typeorm_2.ArrayContains)(departmentsValueArray.length > 0 && departmentsValueArray[0] !== ''
                            ? departmentsValueArray
                            : []),
                        keywords: (0, typeorm_2.ArrayContains)(keywordsArray.length > 0 && keywordsArray[0] !== '' ? keywordsArray : []),
                        isApproved: true,
                        address: (0, typeorm_2.Like)(`%${text}%`),
                    },
                    {
                        lat: (0, typeorm_2.Between)(Number(lat) - Number(parseZoom), Number(lat) + Number(parseZoom)),
                        lng: (0, typeorm_2.Between)(Number(lng) - Number(parseZoom), Number(lng) + Number(parseZoom)),
                        deposit: (0, typeorm_2.Between)(Number(depositArray[0]) * Number(1000), Number(depositArray[1]) !== 100 ? Number(depositArray[1]) * Number(1000) : 2147483640),
                        depositMonly: (0, typeorm_2.Between)(Number(depositMonlyArray[0]) * Number(100), Number(depositMonlyArray[1]) !== 100
                            ? Number(depositMonlyArray[1]) * Number(100)
                            : 2147483640),
                        manageCost: (0, typeorm_2.Between)(Number(manageCostArray[0]) * Number(20), Number(manageCostArray[1]) !== 100
                            ? Number(manageCostArray[1]) * Number(20)
                            : 2147483640),
                        dedicatedArea: (0, typeorm_2.Between)(Number(dedicatedAreaArray[0]) * Number(20), Number(dedicatedAreaArray[1]) !== 100
                            ? Number(dedicatedAreaArray[1]) * Number(20)
                            : 2147483640),
                        supplyArea: (0, typeorm_2.Between)(Number(supplyAreaArray[0]) * Number(20), Number(supplyAreaArray[1]) !== 100
                            ? Number(supplyAreaArray[1]) * Number(20)
                            : 2147483640),
                        departments: (0, typeorm_2.ArrayContains)(departmentsValueArray.length > 0 && departmentsValueArray[0] !== ''
                            ? departmentsValueArray
                            : []),
                        keywords: (0, typeorm_2.ArrayContains)(keywordsArray.length > 0 && keywordsArray[0] !== '' ? keywordsArray : []),
                        isApproved: true,
                        name: (0, typeorm_2.Like)(`%${text}%`),
                    },
                    {
                        lat: (0, typeorm_2.Between)(Number(lat) - Number(parseZoom), Number(lat) + Number(parseZoom)),
                        lng: (0, typeorm_2.Between)(Number(lng) - Number(parseZoom), Number(lng) + Number(parseZoom)),
                        deposit: (0, typeorm_2.Between)(Number(depositArray[0]) * Number(1000), Number(depositArray[1]) !== 100 ? Number(depositArray[1]) * Number(1000) : 2147483640),
                        depositMonly: (0, typeorm_2.Between)(Number(depositMonlyArray[0]) * Number(100), Number(depositMonlyArray[1]) !== 100
                            ? Number(depositMonlyArray[1]) * Number(100)
                            : 2147483640),
                        manageCost: (0, typeorm_2.Between)(Number(manageCostArray[0]) * Number(20), Number(manageCostArray[1]) !== 100
                            ? Number(manageCostArray[1]) * Number(20)
                            : 2147483640),
                        dedicatedArea: (0, typeorm_2.Between)(Number(dedicatedAreaArray[0]) * Number(20), Number(dedicatedAreaArray[1]) !== 100
                            ? Number(dedicatedAreaArray[1]) * Number(20)
                            : 2147483640),
                        supplyArea: (0, typeorm_2.Between)(Number(supplyAreaArray[0]) * Number(20), Number(supplyAreaArray[1]) !== 100
                            ? Number(supplyAreaArray[1]) * Number(20)
                            : 2147483640),
                        departments: (0, typeorm_2.ArrayContains)(departmentsValueArray.length > 0 && departmentsValueArray[0] !== ''
                            ? departmentsValueArray
                            : []),
                        keywords: (0, typeorm_2.ArrayContains)(keywordsArray.length > 0 && keywordsArray[0] !== '' ? keywordsArray : []),
                        isApproved: true,
                        detailAddress: (0, typeorm_2.Like)(`%${text}%`),
                    },
                ],
            });
            const totalCount = locations.length;
            return {
                totalCount,
                statusCode: 200,
                data: locations,
            };
        }
        catch (e) {
            console.error(`getGeoLocation API error: ${e}`);
            throw e;
        }
    }
    async createLocation(payload, header) {
        try {
            const { authorization } = header;
            const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
                secret: process.env.PRIVATE_KEY,
            });
            const { no } = UnSignToken;
            const User = await this.users.findOne({
                where: {
                    no,
                },
            });
            const newLocation = await this.locations.create({
                ...payload,
                user: User,
            });
            this.locations.save(newLocation);
            await this.notionService.notionInsertLocation({
                name: newLocation.name,
                address: newLocation.address,
                keywords: newLocation.keywords,
                departments: newLocation.departments,
                userName: User.nickname,
            });
            return {
                statusCode: 200,
                data: newLocation,
            };
        }
        catch (e) {
            console.error(`create location API error: ${e}`);
            throw e;
        }
    }
    async updateApproveredLocation(payload) {
        try {
            const { no } = payload;
            const location = await this.locations.findOne({
                where: {
                    no,
                },
            });
            if (!location?.no) {
                throw new common_1.BadRequestException('존재하지 않는 매물입니다.');
            }
            location.isApproved = !location.isApproved;
            this.locations.save(location);
            return {
                statusCode: 200,
                data: location,
            };
        }
        catch (e) {
            console.error(`updateApproveredLocation API error: ${e}`);
            throw e;
        }
    }
};
LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_entitiy_1.Location)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        notion_service_1.NotionService])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map