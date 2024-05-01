import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TcpModule } from '@agency-os/tcp-service';
import { Asset } from '@agency-os/class';

@Module({
  imports:[TcpModule.register({ name: Asset.SERVICE_NAME })],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
