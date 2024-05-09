import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryEntity } from './delivery.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Delivery } from '@agency-os/class';
@Injectable()
export class DeliveryRepository {
  private logger: Logger = new Logger(DeliveryRepository.name);
  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepo: Repository<DeliveryEntity>,
  ) {}

  async create(
    createDeliveryRequestDto: Delivery.CreateDeliveryRequestDto,
  ): Promise<DeliveryEntity | Error> {
    try {
      const delivery = this.deliveryRepo.create(createDeliveryRequestDto);
      this.logger.verbose('Delivery created', delivery);
      return await this.deliveryRepo.save(delivery);
    } catch (error: Error | any) {
      this.logger.error(error.name, error.message);
      return error;
    }
  }

  async findOneById({
    id,
  }: Delivery.FindOneDeliveryRequestDto): Promise<DeliveryEntity | null> {
    const delivery = await this.deliveryRepo.findOne({
      where: { id },
    });
    this.logger.verbose('Delivery found', delivery);
    return delivery;
  }

  async findAll(): Promise<DeliveryEntity[] | null> {
    const deliveries = await this.deliveryRepo.find({});
    this.logger.verbose('All deliveries found', deliveries);
    return deliveries;
  }

  async findAllByProject({
    projectId,
  }: Delivery.FindAllDeliveryByProjectRequestDto): Promise<
    DeliveryEntity[] | null
  > {
    const deliveries = await this.deliveryRepo.find({ where: { projectId } });
    this.logger.verbose('All deliveries found by Project', deliveries);
    return deliveries;
  }

  async update(
    updateDeliveryRequestDto: Delivery.UpdateDeliveryRequestDto,
  ): Promise<DeliveryEntity | Error> {
    try {
      const delivery = await this.deliveryRepo.findOne({
        where: { id: updateDeliveryRequestDto.id },
      });
      if (!delivery) {
        throw new EntityNotFoundError(DeliveryEntity, {
          id: updateDeliveryRequestDto.id,
        });
      }
      this.logger.verbose('Delivery found', delivery);
      const updatedDelivery = await this.deliveryRepo.save({
        ...delivery,
        ...updateDeliveryRequestDto,
      });
      this.logger.verbose('Delivery updated', updatedDelivery);
      return updatedDelivery;
    } catch (error: Error | any) {
      this.logger.error(error.name, error.message);
      return error;
    }
  }

  async remove({
    id,
  }: Delivery.FindOneDeliveryRequestDto): Promise<DeliveryEntity | Error> {
    try {
      const delivery = await this.deliveryRepo.findOne({ where: { id } });
      if (!delivery) {
        throw new EntityNotFoundError(DeliveryEntity, { id });
      }
      this.logger.verbose('Delivery found', delivery);
      const removedDelivery = await this.deliveryRepo.softRemove(delivery);
      this.logger.verbose('Delivery removed', removedDelivery);
      return removedDelivery;
    } catch (error: Error | any) {
      this.logger.error(error.name, error.message);
      return error;
    }
  }
}
