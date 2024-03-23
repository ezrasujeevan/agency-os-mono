import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientProto, clientProtoFile } from '@agency-os/proto';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ClientProto.protobufPackage,
        transport: Transport.GRPC,
        options: {
          package: ClientProto.CLIENT_PACKAGE_NAME,
          protoPath: join(
            require.resolve('@agency-os/proto'),
            '../',
            clientProtoFile,
          ),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
