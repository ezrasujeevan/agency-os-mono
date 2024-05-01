import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from './delivery.entity';
import { DeliveryRepository } from './delivery.repository';
import { TcpModule } from '@agency-os/tcp-service';
import { Project } from '@agency-os/class';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryEntity]),
    TcpModule.register({ name: Project.SERVICE_NAME }),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryRepository],
})
export class DeliveryModule {}
