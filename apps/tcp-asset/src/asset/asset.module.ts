import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from './asset.entity';
import { AssetRepository } from './asset.repository';
import { TcpModule } from '@agency-os/tcp-service';
import { Delivery, User } from '@agency-os/class';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity]),
    TcpModule.register({ name: User.SERVICE_NAME }),
    TcpModule.register({ name: Delivery.SERVICE_NAME }),
  ],
  controllers: [AssetController],
  providers: [AssetService, AssetRepository],
})
export class AssetModule {}
