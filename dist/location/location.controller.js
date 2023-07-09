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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../commons/dtos");
const no_dto_1 = require("../commons/dtos/no.dto");
const jwtAuthentication_guard_1 = require("../user/strategy/jwtAuthentication.guard");
const location_dto_1 = require("./dto/location.dto");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    getLocation(request) {
        return this.locationsService.getLocation(request.query);
    }
    getLocations(request) {
        return this.locationsService.getLocations(request.query);
    }
    getGeoLocations(request) {
        return this.locationsService.getGeoLocations(request.query);
    }
    createLocation(payload, header) {
        return this.locationsService.createLocation(payload, header);
    }
    updateApproveredLocation(payload) {
        return this.locationsService.updateApproveredLocation(payload);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: no_dto_1.NoDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocation", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: dtos_1.PaginationDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocations", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: location_dto_1.GetGeoLocationsPaginationDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Get)('list/geo'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getGeoLocations", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: location_dto_1.LocationCrudDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.UseGuards)(jwtAuthentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationCrudDto,
        location_dto_1.LocationCreateHeaderDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "createLocation", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: location_dto_1.LocationUpdateApprovedCrudDto }),
    (0, swagger_1.ApiResponse)({ description: '성공', type: (dtos_1.OutputDto) }),
    (0, common_1.Put)('updateApproved'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationUpdateApprovedCrudDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateApproveredLocation", null);
LocationController = __decorate([
    (0, swagger_1.ApiTags)('입지'),
    (0, common_1.Controller)('location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map