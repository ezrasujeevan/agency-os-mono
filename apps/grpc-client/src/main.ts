import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  ClientProto,
  clientProtoFile,
  CompanyProto,
  companyProtoFile,
} from '@agency-os/proto';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(require.resolve('@agency-os/proto'), '../', clientProtoFile),
          join(require.resolve('@agency-os/proto'), '../', companyProtoFile),
        ],
        package: [
          ClientProto.CLIENT_PACKAGE_NAME,
          CompanyProto.COMPANY_PACKAGE_NAME,
        ],
        url: 'localhost:50052',
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen();
}
bootstrap();
