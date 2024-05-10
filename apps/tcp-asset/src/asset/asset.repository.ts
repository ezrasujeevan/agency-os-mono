import { Asset } from '@agency-os/class';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEntity } from './asset.entity';

@Injectable()
export class AssetRepository {
  private logger = new Logger(AssetRepository.name, { timestamp: true });
  constructor(
    @InjectRepository(AssetEntity) private assetRepo: Repository<AssetEntity>,
  ) {}

  async createAsset(
    createAssetDto: Asset.CreateAssetRequestDto,
  ): Promise<AssetEntity> {
    try {
      const asset = this.assetRepo.create(createAssetDto);
      this.logger.verbose(`Asset Created: ${JSON.stringify(asset)}`);
      return await this.assetRepo.save(asset);
    } catch (error) {
      this.logger.error(`Create Asset Error: ${error.message}`);
      throw error;
    }
  }

  async findAllAssets(): Promise<AssetEntity[]> {
    const assets = await this.assetRepo.find();
    this.logger.verbose(`Assets Found: ${JSON.stringify(assets)}`);
    return assets;
  }

  async findAllAssetsByDelivery({
    deliveryId,
  }: Asset.FindAllAssetsOfDeliveryRequestDto): Promise<AssetEntity[]> {
    const assets = await this.assetRepo.find({
      where: {
        deliveryId,
      },
    });
    this.logger.verbose(`Assets Found: ${JSON.stringify(assets)}`);
    return assets;
  }

  async findOneById({
    id,
  }: Asset.FindOneAssetRequestDto): Promise<AssetEntity | null> {
    const asset = await this.assetRepo.findOne({ where: { id } });
    this.logger.verbose(`Asset Found: ${JSON.stringify(asset)}`);
    return asset;
  }

  async updateAsset(
    updateAssetDto: Asset.UpdateAssetRequestDto,
  ): Promise<AssetEntity | Error> {
    try {
      const asset = await this.findOneById({ id: updateAssetDto.id });
      if (asset) {
        this.logger.verbose(`Asset Found: ${JSON.stringify(asset)}`);
        const updateAsset = await this.assetRepo.merge(asset, updateAssetDto);
        this.logger.verbose(`Asset Updated: ${JSON.stringify(updateAsset)}`);
        return await this.assetRepo.save(updateAsset);
      }
      throw new NotFoundException(
        `Asset not found by id: ${updateAssetDto.id}`,
      );
    } catch (error) {
      this.logger.error(`Update Asset Error: ${error.message}`);
      return error;
    }
  }

  async removeAsset({
    id,
  }: Asset.FindOneAssetRequestDto): Promise<AssetEntity | Error> {
    try {
      const user = await this.findOneById({ id });
      if (user) {
        this.logger.verbose(`Asset Found: ${JSON.stringify(user)}`);
        return await this.assetRepo.softRemove(user);
      }
      throw new NotFoundException(`Asset not found by id: ${id}`);
    } catch (error) {
      this.logger.error(`Remove Asset Error: ${error.message}`);
      return error;
    }
  }
}
