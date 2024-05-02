import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { env } from 'process';
import { TcpService } from '@agency-os/tcp-service';
import { TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  const name = env.TCP_COMPANY_SERVICE_NAME!;
  const app = await NestFactory.create(AppModule);
  const service = app.get<TcpService>(TcpService);
  app.connectMicroservice<TcpOptions>(service.getOptions(name));
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.startAllMicroservices();
}
bootstrap();
