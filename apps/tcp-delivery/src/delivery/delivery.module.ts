import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity, DeliveryFileEntity } from './delivery.entity';
import { DeliveryRepository } from './delivery.repository';
import { TcpModule } from '@agency-os/tcp-service';
import { DeliveryFileRepository } from './delivery.file.repository';
import { Project } from '@agency-os/class';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryEntity, DeliveryFileEntity]),
    TcpModule.register({ name: Project.SERVICE_NAME }),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryRepository, DeliveryFileRepository],
})
export class DeliveryModule {}
