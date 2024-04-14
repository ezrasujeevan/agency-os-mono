import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ClientProto, clientProtoFile } from '@agency-os/proto';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { env } from 'process';

async function bootstrap() {
  const host = env.HOST;
  const port = env.PORT;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(require.resolve('@agency-os/proto'), '../', clientProtoFile),
        ],
        package: [ClientProto.CLIENT_PACKAGE_NAME],
        url: `${host}:${port}`,
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen();
}
bootstrap();
