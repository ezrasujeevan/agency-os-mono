import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { UserProto, userProtoFile } from '@agency-os/proto';
// import { join } from 'path';
// import { AuthModule, UserAuthGuard } from '@agency-os/auth';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { CONFIG_GRPC_USER, Iapp_grpc_user } from '../grpc.users.validations';

import { TcpModule } from '@agency-os/tcp-service';
import { User } from '@agency-os/class';

@Module({
  imports: [TcpModule.register({ name: User.SERVICE_NAME })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
