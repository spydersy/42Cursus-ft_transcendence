"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProfileModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const user_service_1 = require("../user/user.service");
const profile_controller_1 = require("./profile.controller");
const profile_service_1 = require("./profile.service");
const platform_express_1 = require("@nestjs/platform-express");
const chat_module_1 = require("../chat/chat.module");
const tfa_module_1 = require("../tfa/tfa.module");
const tfa_service_1 = require("../tfa/tfa.service");
const config_1 = require("@nestjs/config");
let ProfileModule = ProfileModule_1 = class ProfileModule {
};
ProfileModule = ProfileModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, ProfileModule_1, chat_module_1.ChatModule, tfa_module_1.TfaModule, platform_express_1.MulterModule.register({
                dest: './upload',
            })],
        providers: [profile_service_1.ProfileService, user_service_1.UserService, tfa_service_1.TfaService, config_1.ConfigService],
        controllers: [profile_controller_1.ProfileController],
        exports: [],
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map