import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpOptions } from '@nestjs/microservices';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { env } from 'process';
import { TcpService } from '@agency-os/tcp-service';

async function bootstrap() {
  const host = env.TCP_USER_SERVICE_HOST!;
  const port = env.TCP_USER_SERVICE_PORT!;
  const name = env.TCP_USER_SERVICE_NAME!;
  const url = env.TCP_USER_SERVICE_URL!;
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
  const tcpService = app.get<TcpService>(TcpService);
  app.connectMicroservice<TcpOptions>(tcpService.getOptions(name));
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.startAllMicroservices();
}
bootstrap();
