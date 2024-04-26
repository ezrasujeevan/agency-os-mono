import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from './asset.entity';
import { AssetRepository } from './asset.repository';
import { GrpcModule } from '@agency-os/grpc-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity]),
    GrpcModule.register({ name: 'user' }),
  ],
  controllers: [AssetController],
  providers: [AssetService, AssetRepository],
})
export class AssetModule {}
