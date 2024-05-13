import { Inject, Injectable, Logger } from '@nestjs/common';
import { Asset } from '@agency-os/class';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { getAsset } from 'node:sea';

@Injectable()
export class AssetService {
  private logger = new Logger(AssetService.name);
  constructor(
    @Inject(Asset.SERVICE_NAME) private readonly assetService: ClientTCP,
  ) {}

  async createAsset(
    createAssetRequestDto: Asset.CreateAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    return await firstValueFrom(
      this.assetService.send<
        Asset.AssetResponseDto,
        Asset.CreateAssetRequestDto
      >(Asset.Message.create, createAssetRequestDto),
    );
  }

  async findAllAsset(): Promise<Asset.AssetResponseDto> {
    return await firstValueFrom(
      this.assetService.send<Asset.AssetResponseDto, object>(
        Asset.Message.findAll,
        {},
      ),
    );
  }

  async findAllAssetByDeliveryId(
    deliveryId: Asset.FindAllAssetsOfDeliveryRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    const assets = await firstValueFrom(
      this.assetService.send<
        Asset.AssetResponseDto,
        Asset.FindAllAssetsOfDeliveryRequestDto
      >(Asset.Message.findAllByDelivery, deliveryId),
    );
    this.logger.verbose(`findAll Query DeliveryId:  ${JSON.stringify(assets)}`);
    return assets;
  }

  async findOneAsset(
    id: Asset.FindOneAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    return await firstValueFrom(
      this.assetService.send<
        Asset.AssetResponseDto,
        Asset.FindOneAssetRequestDto
      >(Asset.Message.findOne, id),
    );
  }

  async updateAsset(
    updateAssetRequestDto: Asset.UpdateAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    return await firstValueFrom(
      this.assetService.send<
        Asset.AssetResponseDto,
        Asset.UpdateAssetRequestDto
      >(Asset.Message.update, updateAssetRequestDto),
    );
  }

  async removeAsset(
    id: Asset.FindOneAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    return await firstValueFrom(
      this.assetService.send<
        Asset.AssetResponseDto,
        Asset.FindOneAssetRequestDto
      >(Asset.Message.delete, id),
    );
  }

  async createNewAssetFile(
    createAssetFileRequestDto: Asset.createAssetFileRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    return await firstValueFrom(
      this.assetService.send<
        Asset.AssetResponseDto,
        Asset.createAssetFileRequestDto
      >(Asset.Message.createFile, createAssetFileRequestDto),
    );
  }

  async getAllFilesForAsset(
    id: Asset.FindOneAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    return await firstValueFrom(
      this.assetService.send<
        Asset.AssetResponseDto,
        Asset.FindOneAssetRequestDto
      >(Asset.Message.getAllFiles, id),
    );
  }
}
