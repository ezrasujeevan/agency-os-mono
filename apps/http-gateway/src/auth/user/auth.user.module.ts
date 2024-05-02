import { Module } from '@nestjs/common';

import { User } from '@agency-os/class';
import { TcpModule } from '@agency-os/tcp-service';
import { AuthUserController } from './auth.user.controller';
import { AuthUserService } from './auth.user.service';

@Module({
  imports: [TcpModule.register({ name: User.SERVICE_NAME })],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
