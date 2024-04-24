import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { UserProto, userProtoFile } from '@agency-os/proto';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { GrpcService } from '@agency-os/grpc-service';
import { env } from 'process';

async function bootstrap() {
  const host = env.HOST;
  const port = env.PORT;
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       protoPath: join(
  //         require.resolve('@agency-os/proto'),
  //         '../',
  //         userProtoFile,
  //       ),
  //       package: UserProto.USER_PACKAGE_NAME,
  //       url: `${host}:${port}`,
  //     },
  //   },
  // );
  const app = await NestFactory.create(AppModule);
  const grpcService = app.get<GrpcService>(GrpcService);
  app.connectMicroservice<GrpcOptions>(grpcService.getOptions('user'));
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.startAllMicroservices();
}
bootstrap();
