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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_defaults_1 = require("./config.defaults");
const microservices_1 = require("@nestjs/microservices");
let ConfigService = class ConfigService {
    constructor(data = config_defaults_1.DEFAULT_CONFIG) {
        this.config = data;
    }
    loadFromEnv() {
        this.config = this.parseConfigFromEnv(process.env);
    }
    parseConfigFromEnv(env) {
        return {
            env: env.NODE_ENV || config_defaults_1.DEFAULT_CONFIG.env,
            port: parseInt(env.PORT, 10),
            db: this.parseDBConfig(env, config_defaults_1.DEFAULT_CONFIG.db),
            swagger: this.parseSwaggerConfig(env, config_defaults_1.DEFAULT_CONFIG.swagger),
            logLevel: env.LOG_LEVEL,
            auth: {
                expiresIn: Number(env.TOKEN_EXPIRY),
                access_token_secret: env.JWT_ACCESS_TOKEN_SECRET,
                refresh_token_secret: env.JWT_REFRESH_TOKEN_SECRET,
            },
            userService: {
                options: {
                    host: env.USER_SERVICE_HOST,
                    port: Number(env.USER_SERVICE_PORT),
                },
                transport: microservices_1.Transport.TCP,
            },
            tokenService: {
                options: {
                    host: env.TOKEN_SERVICE_HOST,
                    port: Number(env.TOKEN_SERVICE_PORT),
                },
                transport: microservices_1.Transport.TCP,
            },
            authService: {
                options: {
                    host: env.AUTH_SERVICE_HOST,
                    port: Number(env.AUTH_SERVICE_PORT),
                },
                transport: microservices_1.Transport.GRPC,
            },
            redisService: {
                options: {
                    host: env.REDIS_SERVICE_HOST,
                    port: Number(env.REDIS_SERVICE_PORT),
                },
                transport: microservices_1.Transport.REDIS,
            },
            rmqService: {
                options: {
                    host: env.RMQ_SERVICE_HOST,
                    port: Number(env.RMQ_SERVICE_PORT),
                },
                transport: microservices_1.Transport.RMQ,
            },
        };
    }
    parseDBConfig(env, defaultConfig) {
        return {
            url: env.DATABASE_URL || defaultConfig.url,
        };
    }
    parseSwaggerConfig(env, defaultConfig) {
        return {
            username: env.SWAGGER_USERNAME || defaultConfig.username,
            password: env.SWAGGER_PASSWORD || defaultConfig.password,
        };
    }
    get() {
        return this.config;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ConfigService);
//# sourceMappingURL=config.service.js.map