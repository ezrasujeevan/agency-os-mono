import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { Asset } from '@agency-os/class';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { asset } from '@agency-os/class/dist/asset';

@ApiTags('asset')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  createAsset(
    @Body() createAssetRequestDto: Asset.CreateAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    return this.assetService.createAsset(createAssetRequestDto);
  }

  @ApiQuery({ name: 'delivery', required: false })
  @Get()
  findAll(
    @Query('delivery') deliveryId?: string,
  ): Promise<Asset.AssetResponseDto> {
    if (deliveryId) {
      return this.assetService.findAllAssetByDeliveryId({ deliveryId });
    }
    return this.assetService.findAllAsset();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetService.findOneAsset({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssetRequestDto: Asset.UpdateAssetRequestDto,
  ) {
    updateAssetRequestDto.id = id;
    return this.assetService.updateAsset(updateAssetRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetService.removeAsset({ id });
  }

  @Post(':id/file')
  createFile(
    @Param('id') id: string,
    @Body() create: Asset.createAssetFileRequestDto,
  ) {
    create.assetId = id;
    return this.assetService.createNewAssetFile(create);
  }
  @Get(':id/file')
  findAllFile(@Param('id') id: string) {
    return this.assetService.getAllFilesForAsset({ id });
  }
}
