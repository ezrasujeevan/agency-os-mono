import { Module } from '@nestjs/common';
import { Client } from '@agency-os/class';
import { TcpModule } from '@agency-os/tcp-service';
import { AuthClientService } from './auth.client.service';
import { AuthClientController } from './auth.client.controller';

@Module({
  imports: [TcpModule.register({ name: Client.SERVICE_NAME })],
  controllers: [AuthClientController],
  providers: [AuthClientService],
})
export class AuthClientModule {}
