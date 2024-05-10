import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Delivery } from '@agency-os/class';
import { DeliveryFileEntity } from './delivery.entity';

@Injectable()
export class DeliveryFileRepository {
  private logger: Logger = new Logger(DeliveryFileRepository.name);
  constructor(
    @InjectRepository(DeliveryFileEntity)
    private readonly deliveryFileRepo: Repository<DeliveryFileEntity>,
  ) {}

  async createFile(
    create: Delivery.createDeliveryFileRequestDto,
  ): Promise<DeliveryFileEntity | Error> {
    try {
      const file = this.deliveryFileRepo.create(create);
      this.logger.verbose(`file created: ${JSON.stringify(file)}`);
      return await this.deliveryFileRepo.save(file);
    } catch (error) {
      this.logger.error(`${error.name} -  ${JSON.stringify(error.message)}`);
      return error;
    }
  }

  async getAllFilesForDelivery({
    id,
  }: Delivery.FindOneDeliveryRequestDto): Promise<DeliveryFileEntity[]> {
    const file = this.deliveryFileRepo.find({
      where: { delivery: { id } },
      order: { createdAt: 'DESC' },
    });
    this.logger.verbose(`files found: ${JSON.stringify(file)}`);
    return file;
  }

  async getLatestFileForDelivery({
    id,
  }: Delivery.FindOneDeliveryRequestDto): Promise<DeliveryFileEntity | null> {
    const file = this.deliveryFileRepo.findOne({
      where: { delivery: { id } },
      order: { createdAt: 'DESC' },
    });
    this.logger.verbose(`latest file found: ${JSON.stringify(file)}`);
    return file;
  }
}
