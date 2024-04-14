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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const users_module_1 = require("./users/users.module");
const client_module_1 = require("./client/client.module");
const auth_1 = require("@agency-os/auth");
const config_1 = require("@nestjs/config");
const app_validation_1 = require("./app.validation");
const grpc_users_validations_1 = require("./grpc.users.validations");
const grpc_client_validations_1 = require("./grpc.client.validations");
const auth_client_controller_1 = require("./auth.client.controller");
const auth_user_controller_1 = require("./auth.user.controller");
let AppModule = AppModule_1 = class AppModule {
    constructor() {
        this.logger = new common_1.Logger(AppModule_1.name);
    }
    onModuleInit() {
        const config = this.configService.get(app_validation_1.CONFIG_APP);
        this.logger.log(`Apllication Started on Port ${config.app.port} `);
        this.logger.warn(`This Application is in ${config.env}`);
    }
};
exports.AppModule = AppModule;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", config_1.ConfigService)
], AppModule.prototype, "configService", void 0);
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            config_1.ConfigModule.forFeature(app_validation_1.validate_app),
            config_1.ConfigModule.forFeature(grpc_users_validations_1.validate_user),
            config_1.ConfigModule.forFeature(grpc_client_validations_1.validate_client),
            users_module_1.UsersModule,
            client_module_1.ClientModule,
            auth_1.AuthModule.register({}),
        ],
        controllers: [app_controller_1.AppController, auth_client_controller_1.AuthClientController, auth_user_controller_1.AuthUserController],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map