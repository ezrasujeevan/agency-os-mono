// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthClientController } from '../auth.client.controller';
// import {
//   ClientProto,
//   UserProto,
//   clientProtoFile,
//   userProtoFile,
// } from '@agency-os/proto';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { join } from 'path';
// import { Iapp_grpc_user, CONFIG_GRPC_USER } from '../grpc.users.validations';
// import {
//   Iapp_grpc_client,
//   CONFIG_GRPC_CLIENT,
// } from 'src/grpc.client.validations';
// import { AuthUserController } from '../auth.user.controller';

// @Module({
//   imports: [
//     ClientsModule.registerAsync([
//       {
//         name: UserProto.protobufPackage,
//         imports: [ConfigModule],
//         inject: [ConfigService],
//         useFactory: (configService: ConfigService) => {
//           const config: Iapp_grpc_user =
//             configService.get<Iapp_grpc_user>(CONFIG_GRPC_USER)!;

//           return {
//             transport: Transport.GRPC,
//             options: {
//               package: UserProto.USER_PACKAGE_NAME,
//               protoPath: join(
//                 require.resolve('@agency-os/proto'),
//                 '../',
//                 userProtoFile,
//               ),
//               url: config.user.url,
//             },
//           };
//         },
//       },
//       {
//         name: ClientProto.protobufPackage,
//         imports: [ConfigModule],
//         inject: [ConfigService],
//         useFactory: (configService: ConfigService) => {
//           const config: Iapp_grpc_client =
//             configService.get<Iapp_grpc_client>(CONFIG_GRPC_CLIENT)!;

//           return {
//             transport: Transport.GRPC,
//             options: {
//               package: ClientProto.CLIENT_PACKAGE_NAME,
//               protoPath: join(
//                 require.resolve('@agency-os/proto'),
//                 '../',
//                 clientProtoFile,
//               ),
//               url: config.client.url,
//             },
//           };
//         },
//       },
//     ]),
//   ],
//   controllers: [AuthUserController, AuthClientController],
//   providers: [AuthService],
// })
// export class AuthModule {}
