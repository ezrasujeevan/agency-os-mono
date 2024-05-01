import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ClientProto, clientProtoFile } from '@agency-os/proto';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { env } from 'process';
import { GrpcService } from '@agency-os/grpc-service';

async function bootstrap() {
  const host = env.GRPC_CLIENT_HOST!;
  const port = env.GRPC_CLIENT_PORT!;
  const name = env.GRPC_CLIENT_NAME!;
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       protoPath: [
  //         join(require.resolve('@agency-os/proto'), '../', clientProtoFile),
  //       ],
  //       package: [ClientProto.CLIENT_PACKAGE_NAME],
  //       url: `${host}:${port}`,
  //     },
  //   },
  // );
  const app = await NestFactory.create(AppModule);
  const grpcService = app.get<GrpcService>(GrpcService);
  app.connectMicroservice(grpcService.getOptions(name));
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.startAllMicroservices();
}
bootstrap();
