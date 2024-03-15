import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { User, userProto } from '@agency-os/proto';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(require.resolve('@agency-os/proto'), '../', userProto),
        package: User.USER_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
