import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { UserProto, userProtoFile } from '@agency-os/proto';
// import { join } from 'path';
// import { AuthModule, UserAuthGuard } from '@agency-os/auth';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { CONFIG_GRPC_USER, Iapp_grpc_user } from '../grpc.users.validations';
import { GrpcModule } from '@agency-os/grpc-service';
import { GRPC } from 'src/constants';

@Module({
  imports: [
    // ClientsModule.registerAsync([
    //   {
    //     name: UserProto.protobufPackage,
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: (configService: ConfigService) => {
    //       const config: Iapp_grpc_user =
    //         configService.get<Iapp_grpc_user>(CONFIG_GRPC_USER)!;

    //       return {
    //         transport: Transport.GRPC,
    //         options: {
    //           package: UserProto.USER_PACKAGE_NAME,
    //           protoPath: join(
    //             require.resolve('@agency-os/proto'),
    //             '../',
    //             userProtoFile,
    //           ),
    //           url: config.user.url,
    //         },
    //       };
    //     },
    //   },
    // ]),
    GrpcModule.register({ name: GRPC.USER_SERVICE }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
