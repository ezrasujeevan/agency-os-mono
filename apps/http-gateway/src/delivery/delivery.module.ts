import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TcpModule } from '@agency-os/tcp-service';
import { Delivery } from '@agency-os/class';
@Module({
  imports: [TcpModule.register({ name: Delivery.SERVICE_NAME })],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
