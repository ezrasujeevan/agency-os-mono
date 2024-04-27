import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ClientProto, clientProtoFile } from '@agency-os/proto';
// import { join } from 'path';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import {
//   CONFIG_GRPC_CLIENT,
//   Iapp_grpc_client,
// } from '../grpc.client.validations';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { GRPC } from 'src/constants';
import { GrpcModule } from '@agency-os/grpc-service';
import { ClientProto } from '@agency-os/proto';

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
    // ClientsModule.registerAsync([
    //   {
    //     name: ClientProto.protobufPackage,
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: (configService: ConfigService) => {
    //       const config: Iapp_grpc_client =
    //         configService.get<Iapp_grpc_client>(CONFIG_GRPC_CLIENT)!;

    //       return {
    //         transport: Transport.GRPC,
    //         options: {
    //           package: ClientProto.CLIENT_PACKAGE_NAME,
    //           protoPath: join(
    //             require.resolve('@agency-os/proto'),
    //             '../',
    //             clientProtoFile,
    //           ),
    //           url: config.client.url,
    //         },
    //       };
    //     },
    //   },
    // ]),
    GrpcModule.register({ name: ClientProto.CLIENT_PACKAGE_NAME }),
  ],
  controllers: [ClientController, CompanyController],
  providers: [ClientService, CompanyService],
})
export class ClientModule {}
