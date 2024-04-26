import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpService } from '@agency-os/tcp-service';
import { env } from 'process';
import { TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  const deliveryName = env.TCP_DELIVERY_NAME!;
  const app = await NestFactory.create(AppModule);
  const tcpService = app.get<TcpService>(TcpService);
  app.connectMicroservice<TcpOptions>(tcpService.getOptions(deliveryName));
  await app.startAllMicroservices();
}
bootstrap();
