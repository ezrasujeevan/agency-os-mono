import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpService } from '@agency-os/tcp-service';
import { env } from 'process';
import { TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  const name = env.TCP_DELIVERY_SERVICE_NAME!;
  const app = await NestFactory.create(AppModule);
  const tcpService = app.get<TcpService>(TcpService);
  app.connectMicroservice<TcpOptions>(tcpService.getOptions(name));
  await app.startAllMicroservices();
}
bootstrap();
