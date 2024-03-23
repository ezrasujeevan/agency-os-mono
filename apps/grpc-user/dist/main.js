"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const proto_1 = require("@agency-os/proto");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            protoPath: (0, path_1.join)(require.resolve('@agency-os/proto'), '../', proto_1.userProtoFile),
            package: proto_1.UserProto.USER_PACKAGE_NAME,
            url: 'localhost:50051',
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({}));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map