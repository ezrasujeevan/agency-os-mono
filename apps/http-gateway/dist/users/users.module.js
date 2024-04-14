"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const microservices_1 = require("@nestjs/microservices");
const proto_1 = require("@agency-os/proto");
const path_1 = require("path");
const auth_1 = require("@agency-os/auth");
const config_1 = require("@nestjs/config");
const grpc_users_validations_1 = require("../grpc.users.validations");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.registerAsync([
                {
                    name: proto_1.UserProto.protobufPackage,
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => {
                        const config = configService.get(grpc_users_validations_1.CONFIG_GRPC_USER);
                        return {
                            transport: microservices_1.Transport.GRPC,
                            options: {
                                package: proto_1.UserProto.USER_PACKAGE_NAME,
                                protoPath: (0, path_1.join)(require.resolve('@agency-os/proto'), '../', proto_1.userProtoFile),
                                url: config.user.url,
                            },
                        };
                    },
                },
            ]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, auth_1.UserAuthGuard],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map