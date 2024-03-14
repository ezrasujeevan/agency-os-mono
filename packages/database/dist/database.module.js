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
const config_1 = require("@agency-os/config");
const typeorm_1 = require("@nestjs/typeorm");
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static getConnectionOptions(config, dbConfig) {
        const dbData = config.get().db;
        if (!dbData) {
            throw Error('');
        }
        const connectionOptions = this.getConnectionOptionsPostgres(dbData);
        return {
            ...connectionOptions,
            entities: dbConfig.entities,
            synchronize: true,
            logging: true,
        };
    }
    static getConnectionOptionsPostgres(dbData) {
        return {
            type: 'postgres',
            url: dbData.url,
            keepConnectionAlive: true,
            ssl: process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test'
                ? { rejectUnauthorized: false }
                : false,
        };
    }
    static forRoot(dbConfig) {
        return {
            module: DatabaseModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: (configService) => {
                        return DatabaseModule_1.getConnectionOptions(configService, dbConfig);
                    },
                    inject: [config_1.ConfigService],
                }),
            ],
            controllers: [],
            providers: [],
            exports: [],
        };
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Module)({})
], DatabaseModule);
//# sourceMappingURL=database.module.js.map