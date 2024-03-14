"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.DEFAULT_CONFIG = {
    port: Number(process.env.PORT || 3001),
    env: 'production',
    db: {
        url: process.env.DATABASE_URL,
    },
    auth: {
        expiresIn: 30000,
        access_token_secret: '',
        refresh_token_secret: '',
    },
    swagger: {
        username: '',
        password: '',
    },
    logLevel: '',
    userService: {
        options: {
            host: '',
            port: 3000,
        },
        transport: microservices_1.Transport.TCP,
    },
    authService: {
        options: {
            host: '',
            port: 3000,
        },
        transport: microservices_1.Transport.TCP,
    },
};
//# sourceMappingURL=config.defaults.js.map