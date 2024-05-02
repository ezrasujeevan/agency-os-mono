import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Asset, Delivery, User } from '@agency-os/class';
import { ClientTCP } from '@nestjs/microservices';
import { AssetRepository } from './asset.repository';
import { firstValueFrom } from 'rxjs';
import { AssetEntity } from './asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @Inject(User.SERVICE_NAME) private readonly userService: ClientTCP,
    @Inject(Delivery.SERVICE_NAME) private readonly deliveryService: ClientTCP,
    private assetRepo: AssetRepository,
  ) {}

  async createAsset(
    createAssetDto: Asset.CreateAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    if (!(await this.isValidUser(createAssetDto.createdBy))) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'User not found',
      };
    }
    if (!(await this.isValidDelivery(createAssetDto.deliveryId))) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Delivery not found',
      };
    }
    const asset = await this.assetRepo.createAsset(createAssetDto);
    if (asset instanceof Error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: asset.message,
      };
    } else if (asset instanceof AssetEntity) {
      return {
        status: HttpStatus.CREATED,
        asset,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async findAllAsset(): Promise<Asset.AssetResponseDto> {
    const assets = await this.assetRepo.findAllAssets();
    if (
      Array.isArray(assets) &&
      assets.every((a) => a instanceof AssetEntity)
    ) {
      return {
        status: HttpStatus.OK,
        asset: assets,
      };
    } else {
      return { status: HttpStatus.NOT_FOUND, error: 'Assets not found' };
    }
  }

  async findAllAssetByDelivery({
    deliveryId,
  }: Asset.FindAllAssetsOfDeliveryRequestDto): Promise<Asset.AssetResponseDto> {
    if (!(await this.isValidDelivery(deliveryId))) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Delivery not found',
      };
    }
    const assets = await this.assetRepo.findAllAssetsByDelivery({
      deliveryId,
    });
    if (
      Array.isArray(assets) &&
      assets.every((a) => a instanceof AssetEntity)
    ) {
      return {
        status: HttpStatus.OK,
        asset: assets,
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        error: `Assets not found by Delivery Id: ${deliveryId}`,
      };
    }
  }

  async findOneAsset({
    id,
  }: Asset.FindOneAssetRequestDto): Promise<Asset.AssetResponseDto> {
    const asset = await this.assetRepo.findOneAsset({ id });
    if (asset instanceof AssetEntity) {
      return {
        status: HttpStatus.OK,
        asset,
      };
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: 'Asset not found',
    };
  }

  async updateAsset(
    updateAssetDto: Asset.UpdateAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    const { createdBy, deliveryId } = updateAssetDto;
    if (createdBy) {
      if (!(await this.isValidUser(createdBy))) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        };
      }
    }
    if (deliveryId) {
      if (!(await this.isValidDelivery(deliveryId))) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'Delivery not found',
        };
      }
    }
    const asset = await this.assetRepo.updateAsset(updateAssetDto);
    if (asset instanceof Error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: asset.message,
      };
    } else if (asset instanceof AssetEntity) {
      return {
        status: HttpStatus.OK,
        asset,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async removeAsset({
    id,
  }: Asset.FindOneAssetRequestDto): Promise<Asset.AssetResponseDto> {
    const asset = await this.assetRepo.removeAsset({ id });
    if (asset instanceof Error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: asset.message,
      };
    } else if (asset instanceof AssetEntity) {
      return {
        status: HttpStatus.OK,
        asset,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  private async isValidUser(id: string): Promise<boolean> {
    const userResponse = await firstValueFrom(
      await this.userService.send<
        User.UserResponseDto,
        User.FindOneUserByIdRequestDto
      >(User.Message.findOneById, { id }),
    );

    if (userResponse.status === HttpStatus.OK) {
      return true;
    }
    return false;
  }

  private async isValidDelivery(id: string): Promise<boolean> {
    const deliveryResponse = await firstValueFrom(
      await this.deliveryService.send<
        Delivery.DeliveryResponseDto,
        Delivery.FindOneDeliveryRequestDto
      >(Delivery.Message.findOne, { id }),
    );

    if (deliveryResponse.status === HttpStatus.OK) {
      return true;
    }
    return false;
  }
}
