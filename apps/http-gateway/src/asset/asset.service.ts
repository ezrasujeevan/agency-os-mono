import { Inject, Injectable } from '@nestjs/common';
import { Asset } from '@agency-os/class';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AssetService {
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
    return await firstValueFrom(
      this.assetService.send<
        Asset.AssetResponseDto,
        Asset.FindAllAssetsOfDeliveryRequestDto
      >(Asset.Message.findAllByDelivery, deliveryId),
    );
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
}
