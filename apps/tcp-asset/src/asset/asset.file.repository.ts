import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetFileEntity } from './asset.entity';
import { Repository } from 'typeorm';
import { Asset } from '@agency-os/class';

@Injectable()
export class AssetFileRepository {
  private logger: Logger = new Logger(AssetFileRepository.name);
  constructor(
    @InjectRepository(AssetFileEntity)
    private readonly fileRepo: Repository<AssetFileEntity>,
  ) {}

  async createFile(
    create: Asset.createAssetFileRequestDto,
  ): Promise<AssetFileEntity | Error> {
    try {
      const file = await this.fileRepo.create(create);
      this.logger.verbose(`create file: ${file}`);
      return await this.fileRepo.save(file);
    } catch (error) {
      this.logger.error(`create file: ${error.message}`);
      return error;
    }
  }

  async getAllFilesForAsset({
    id,
  }: Asset.FindOneAssetRequestDto): Promise<AssetFileEntity[]> {
    const file = this.fileRepo.find({
      where: { asset: { id } },
      order: { createdAt: 'DESC' },
    });
    this.logger.verbose(`files found: ${JSON.stringify(file)}`);
    return file;
  }

  async getLatestFileForAsset({
    id,
  }: Asset.FindOneAssetRequestDto): Promise<AssetFileEntity | null> {
    const file = this.fileRepo.findOne({
      where: { asset: { id } },
      order: { createdAt: 'DESC' },
    });
    this.logger.verbose(`latest file found: ${JSON.stringify(file)}`);
    return file;
  }
}
