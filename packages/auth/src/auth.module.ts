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
import { GrpcModule } from '@agency-os/grpc-service';

@Module({})
export class AuthModule {
  public static register({ client, user }: AuthInterface): DynamicModule {
    return {
      global: true,
      module: AuthModule,
      providers: [
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: { client, user },
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
        GrpcModule.register({ name: client }),
        GrpcModule.register({ name: user }),
      ],
    };
  }
}
