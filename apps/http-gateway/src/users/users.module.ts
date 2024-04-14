import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserProto, userProtoFile } from '@agency-os/proto';
import { join } from 'path';
import { AuthModule, UserAuthGuard } from '@agency-os/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_GRPC_USER, Iapp_grpc_user } from '../grpc.users.validations';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: UserProto.protobufPackage,
    //     transport: Transport.GRPC,
    //     options: {
    //       package: UserProto.USER_PACKAGE_NAME,
    //       protoPath: join(
    //         require.resolve('@agency-os/proto'),
    //         '../',
    //         userProtoFile,
    //       ),
    //       url: 'localhost:50051',
    //     },
    //   },
    // ]),
    ClientsModule.registerAsync([
      {
        name: UserProto.protobufPackage,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const config: Iapp_grpc_user =
            configService.get<Iapp_grpc_user>(CONFIG_GRPC_USER)!;

          return {
            transport: Transport.GRPC,
            options: {
              package: UserProto.USER_PACKAGE_NAME,
              protoPath: join(
                require.resolve('@agency-os/proto'),
                '../',
                userProtoFile,
              ),
              url: config.user.url,
            },
          };
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserAuthGuard],
})
export class UsersModule {}
