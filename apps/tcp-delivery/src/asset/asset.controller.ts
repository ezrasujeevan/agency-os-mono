import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AssetService } from './asset.service';
import { Asset } from '@agency-os/class';

@Controller()
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @MessagePattern(Asset.Message.create)
  create(@Payload() createAssetDto: Asset.CreateAssetRequestDto) {
    return this.assetService.create(createAssetDto);
  }

  @MessagePattern(Asset.Message.findAll)
  findAll() {
    return this.assetService.findAll();
  }

  @MessagePattern(Asset.Message.findOne)
  findOne(@Payload() id: Asset.FindOneAssetRequestDto) {
    return this.assetService.findOne(id);
  }

  @MessagePattern(Asset.Message.update)
  update(@Payload() updateAssetDto: Asset.UpdateAssetRequestDto) {
    return this.assetService.update(updateAssetDto.id, updateAssetDto);
  }

  @MessagePattern(Asset.Message.delete)
  delete(@Payload() id: Asset.FindOneAssetRequestDto) {
    return this.assetService.remove(id);
  }
}
