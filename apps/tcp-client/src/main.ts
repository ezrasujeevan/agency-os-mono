import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpOptions } from '@nestjs/microservices';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { env } from 'process';
import { TcpService } from '@agency-os/tcp-service';
import { log } from 'console';

async function bootstrap() {
  const host = env.TCP_CLIENT_HOST!;
  const port = env.TCP_CLIENT_PORT!;
  const name = env.TCP_CLIENT_SERVICE_NAME!;
  log(name);

  const app = await NestFactory.create(AppModule);
  const service = app.get<TcpService>(TcpService);
  app.connectMicroservice<TcpOptions>(service.getOptions(name));
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.startAllMicroservices();
}
bootstrap();
