import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInterface } from './auth.interface';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import {
  ClientProto,
  UserProto,
  clientProtoFile,
  userProtoFile,
} from '@agency-os/proto';
import { join } from 'path';
import { UserAuthGuard } from './guard/user.auth.guard';
import { ClientAuthGuard } from './guard/client.auth.guard';
import { GrpcClientAuthGuard } from './guard/grpc.client.auth.guard';
import { GrpcUserAuthGuard } from './guard/grpc.user.auth.guard';
import { HttpClientAuthGuard } from './guard/http.client.auth.guard';
import { HttpUserAuthGuard } from './guard/http.user.auth.guard';

@Module({})
export class AuthModule {
  public static register(options: AuthInterface): DynamicModule {
    return {
      global: true,
      module: AuthModule,
      providers: [
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: options,
        },
        UserAuthGuard,
        ClientAuthGuard,
        GrpcClientAuthGuard,
        GrpcUserAuthGuard,
        HttpClientAuthGuard,
        HttpUserAuthGuard,
      ],
      exports: [
        AuthService,
        UserAuthGuard,
        ClientAuthGuard,
        GrpcClientAuthGuard,
        GrpcUserAuthGuard,
        HttpClientAuthGuard,
        HttpUserAuthGuard,
      ],
      imports: [
        ClientsModule.registerAsync([
          {
            name: UserProto.protobufPackage,

            useFactory: () => {
              return {
                transport: Transport.GRPC,
                options: {
                  package: UserProto.USER_PACKAGE_NAME,
                  protoPath: join(
                    require.resolve('@agency-os/proto'),
                    '../',
                    userProtoFile,
                  ),
                  url: 'localhost:5051',
                },
              };
            },
          },
          {
            name: ClientProto.protobufPackage,
            useFactory: () => {
              return {
                transport: Transport.GRPC,
                options: {
                  package: ClientProto.CLIENT_PACKAGE_NAME,
                  protoPath: join(
                    require.resolve('@agency-os/proto'),
                    '../',
                    clientProtoFile,
                  ),
                  url: 'localhost:5052',
                },
              };
            },
          },
        ]),
      ],
    };
  }
}
