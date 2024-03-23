import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserProto, userProtoFile } from '@agency-os/proto';
import { join } from 'path';

@Module({
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
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
