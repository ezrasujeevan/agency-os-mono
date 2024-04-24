import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpService } from '@agency-os/tcp-service';
import { env } from 'process';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  // const host = env.TCP_PROJECT_SERVICE_HOST!;
  // const port: number = parseInt(env.TCP_PROJECT_SERVICE_PORT!);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: {
  //       host,
  //       port,
  //     },
  //   },
  // );
  // await app.listen();
  const projectName = env.TCP_PROJECT_SERVICE_NAME!;
  const app = await NestFactory.create(AppModule);
  const tcpService = app.get<TcpService>(TcpService);
  app.connectMicroservice<TcpOptions>(tcpService.getOptions(projectName));
  await app.startAllMicroservices();
}
bootstrap();
