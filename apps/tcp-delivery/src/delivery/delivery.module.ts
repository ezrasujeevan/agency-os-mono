import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from './delivery.entity';
import { DeliveryRepository } from './delivery.repository';
import { TcpModule } from '@agency-os/tcp-service';
import { DeliveryFileEntity } from './delivery.file.entity';
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
