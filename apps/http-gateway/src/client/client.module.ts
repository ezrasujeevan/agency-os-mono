import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientProto, clientProtoFile } from '@agency-os/proto';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CONFIG_GRPC_CLIENT,
  Iapp_grpc_client,
} from '../grpc.client.validations';
import { CompanyService } from './company.service';
import { Company } from '@agency-os/class';
import { CompanyController } from './company.controller';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: ClientProto.protobufPackage,
    //     transport: Transport.GRPC,
    //     options: {
    //       package: ClientProto.CLIENT_PACKAGE_NAME,
    //       protoPath: join(
    //         require.resolve('@agency-os/proto'),
    //         '../',
    //         clientProtoFile,
    //       ),
    //       url: 'localhost:50052',
    //     },
    //   },
    // ]),
    ClientsModule.registerAsync([
      {
        name: ClientProto.protobufPackage,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const config: Iapp_grpc_client =
            configService.get<Iapp_grpc_client>(CONFIG_GRPC_CLIENT)!;

          return {
            transport: Transport.GRPC,
            options: {
              package: ClientProto.CLIENT_PACKAGE_NAME,
              protoPath: join(
                require.resolve('@agency-os/proto'),
                '../',
                clientProtoFile,
              ),
              url: config.client.url,
            },
          };
        },
      },
    ]),
  ],
  controllers: [ClientController, CompanyController],
  providers: [ClientService, CompanyService],
})
export class ClientModule {}
