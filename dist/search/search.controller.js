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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const search_service_1 = require("./search.service");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async FriendsSearch(req, query, res) {
        if (query['input']) {
            switch (req.params.dest) {
                case 'friends':
                    return this.searchService.FriendsSearch(req.user.userId, query['input'], res);
                case 'allUsers':
                    return this.searchService.AllUsersSearch(query['input'], res);
                case 'channels':
                    return res.send({ 'message': "Not Implemented Yet",
                        'Channels': [] });
                default:
                    return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "Bad Request00" });
            }
        }
        return res.status(common_1.HttpStatus.BAD_REQUEST).send({ 'message': 'Bad Request01' });
    }
};
__decorate([
    (0, common_1.Get)(':dest'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "FriendsSearch", null);
SearchController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map