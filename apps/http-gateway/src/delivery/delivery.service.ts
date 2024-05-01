import { Inject, Injectable } from '@nestjs/common';
import { Delivery } from '@agency-os/class';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DeliveryService {
  constructor(
    @Inject(Delivery.SERVICE_NAME) private readonly deliveryService: ClientTCP,
  ) {}
  async createDelivery(
    createDeliveryRequestDto: Delivery.CreateDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponse> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponse,
        Delivery.CreateDeliveryRequestDto
      >(Delivery.Message.create, createDeliveryRequestDto),
    );
  }

  async findAllDelivery(): Promise<Delivery.DeliveryResponse> {
    return await firstValueFrom(
      this.deliveryService.send<Delivery.DeliveryResponse, object>(
        Delivery.Message.findAll,
        {},
      ),
    );
  }

  async findAllDeliveryByProject(
    projectId: Delivery.FindAllDeliveryByProjectRequestDto,
  ): Promise<Delivery.DeliveryResponse> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponse,
        Delivery.FindAllDeliveryByProjectRequestDto
      >(Delivery.Message.findAllByProject, projectId),
    );
  }

  async findOneDelivery(
    id: Delivery.FindOneDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponse> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponse,
        Delivery.FindOneDeliveryRequestDto
      >(Delivery.Message.findOne, id),
    );
  }

  async updateDelivery(
    updateDeliveryRequestDto: Delivery.UpdateDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponse> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponse,
        Delivery.UpdateDeliveryRequestDto
      >(Delivery.Message.update, updateDeliveryRequestDto),
    );
  }

  async removeDelivery(
    id: Delivery.FindOneDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponse> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponse,
        Delivery.FindOneDeliveryRequestDto
      >(Delivery.Message.delete, id),
    );
  }
}
