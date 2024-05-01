import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TcpModule } from '@agency-os/tcp-service';
import { Client, Company } from '@agency-os/class';

@Module({
  imports: [TcpModule.register({ name: Client.SERVICE_NAME })],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
