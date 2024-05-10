import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TcpModule } from '@agency-os/tcp-service';
import { User } from '@agency-os/class';

@Module({
  imports: [TcpModule.register({ name: User.SERVICE_NAME, global: true })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
