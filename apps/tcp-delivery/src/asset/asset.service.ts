import { HttpStatus, Injectable } from '@nestjs/common';
import { Asset } from '@agency-os/class';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity } from './asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity) private assetRepo: Repository<AssetEntity>,
  ) {}

  async create(
    createAssetDto: Asset.CreateAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    try {
      const asset = this.assetRepo.create(createAssetDto);
      await this.assetRepo.save(asset);
      return {
        status: HttpStatus.CREATED,
        asset,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }

  async findAll(): Promise<Asset.AssetResponseDto> {
    const assets = await this.assetRepo.find();
    return {
      status: HttpStatus.OK,
      asset: assets,
    };
  }

  async findAllByDelivery({
    deliveryId,
  }: Asset.FindAllAssetsOfDeliveryRequestDto): Promise<Asset.AssetResponseDto> {
    const assets = await this.assetRepo.find({
      where: {
        delivery: {
          id: deliveryId,
        },
      },
    });
    return {
      status: HttpStatus.OK,
      asset: assets,
    };
  }

  async findOne({
    id,
  }: Asset.FindOneAssetRequestDto): Promise<Asset.AssetResponseDto> {
    const asset = await this.assetRepo.findOne({ where: { id } });
    if (asset) {
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

  async update(
    id: string,
    updateAssetDto: Asset.UpdateAssetRequestDto,
  ): Promise<Asset.AssetResponseDto> {
    try {
      const asset = await this.assetRepo.findOne({ where: { id } });
      if (asset) {
        const updateAsset = await this.assetRepo.merge(asset, updateAssetDto);
        await this.assetRepo.save(updateAsset);
        return {
          status: HttpStatus.OK,
          asset: updateAsset,
        };
      }
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Asset not found',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }

  async remove({
    id,
  }: Asset.FindOneAssetRequestDto): Promise<Asset.AssetResponseDto> {
    const asset = await this.assetRepo.findOne({ where: { id } });
    if (asset) {
      await this.assetRepo.delete(id);
      return {
        status: HttpStatus.NO_CONTENT,
      };
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: 'Asset not found',
    };
  }
}
