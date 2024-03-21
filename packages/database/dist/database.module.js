"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@agency-os/config");
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static forRootAsync(driver) {
        return {
            module: DatabaseModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: async (configService) => {
                        const optionn = {
                            type: driver,
                            url: configService.getDB('url'),
                            host: configService.getDB('host'),
                            port: +configService.getDB('port'),
                            username: configService.getDB('username'),
                            password: configService.getDB('password'),
                            database: configService.getDB('name'),
                            entities: [],
                            synchronize: true,
                        };
                        const asd = { ...optionn };
                        return asd;
                    },
                    inject: [config_1.ConfigService],
                }),
            ],
        };
    }
    static forFeature(entities) {
        return {
            module: DatabaseModule_1,
            imports: [typeorm_1.TypeOrmModule.forFeature(entities)],
        };
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [config_1.ConfigService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map