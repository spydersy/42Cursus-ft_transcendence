"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const user_service_1 = require("./user/user.service");
const user_controller_1 = require("./user/user.controller");
const user_module_1 = require("./user/user.module");
const profile_service_1 = require("./profile/profile.service");
const profile_module_1 = require("./profile/profile.module");
const config_1 = require("@nestjs/config");
const profile_controller_1 = require("./profile/profile.controller");
const prisma_service_1 = require("./prisma/prisma.service");
const search_module_1 = require("./search/search.module");
const search_service_1 = require("./search/search.service");
const chat_controller_1 = require("./chat/chat.controller");
const chat_service_1 = require("./chat/chat.service");
const chat_module_1 = require("./chat/chat.module");
const tfa_service_1 = require("./tfa/tfa.service");
const tfa_controller_1 = require("./tfa/tfa.controller");
const tfa_module_1 = require("./tfa/tfa.module");
const chat_gateway_1 = require("./chat.gateway");
const jwt_1 = require("@nestjs/jwt");
const online_loger_gateway_1 = require("./online-loger.gateway");
const game_service_1 = require("./game/game.service");
const game_controller_1 = require("./game/game.controller");
const game_module_1 = require("./game/game.module");
const game_gateway_1 = require("./game.gateway");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, prisma_module_1.PrismaModule, user_module_1.UserModule, profile_module_1.ProfileModule, config_1.ConfigModule.forRoot(), search_module_1.SearchModule, chat_module_1.ChatModule, tfa_module_1.TfaModule, game_module_1.GameModule],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, profile_controller_1.ProfileController, chat_controller_1.ChatController, tfa_controller_1.TfaController, game_controller_1.GameController],
        providers: [app_service_1.AppService, user_service_1.UserService, profile_service_1.ProfileService, prisma_service_1.PrismaService, search_service_1.SearchService, chat_service_1.ChatService, tfa_service_1.TfaService, chat_gateway_1.ChatGateway, jwt_1.JwtService, online_loger_gateway_1.OnlineLogerGateway, game_service_1.GameService, game_gateway_1.GameGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map