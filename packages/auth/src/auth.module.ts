import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInterface } from './auth.interface';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ClientProto,
  UserProto,
  clientProtoFile,
  userProtoFile,
} from '@agency-os/proto';
import { join } from 'path';

@Module({})
export class AuthModule {
  public static register(options: AuthInterface): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: options,
        },
      ],
      exports: [AuthService],
      imports: [
        ClientsModule.register([
          {
            name: UserProto.protobufPackage,
            transport: Transport.GRPC,
            options: {
              package: UserProto.USER_PACKAGE_NAME,
              protoPath: join(
                require.resolve('@agency-os/proto'),
                '../',
                userProtoFile,
              ),
              url: 'localhost:50051',
            },
          },
        ]),
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
              url: 'localhost:50051',
            },
          },
        ]),
      ],
    };
  }

  public static registerAsync(options: AuthInterface): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: options,
        },
      ],
      exports: [AuthService],
    };
  }
}
