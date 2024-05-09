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
  ): Promise<Delivery.DeliveryResponseDto> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponseDto,
        Delivery.CreateDeliveryRequestDto
      >(Delivery.Message.create, createDeliveryRequestDto),
    );
  }

  async findAllDelivery(): Promise<Delivery.DeliveryResponseDto> {
    return await firstValueFrom(
      this.deliveryService.send<Delivery.DeliveryResponseDto, object>(
        Delivery.Message.findAll,
        {},
      ),
    );
  }

  async findAllDeliveryByProject(
    projectId: Delivery.FindAllDeliveryByProjectRequestDto,
  ): Promise<Delivery.DeliveryResponseDto> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponseDto,
        Delivery.FindAllDeliveryByProjectRequestDto
      >(Delivery.Message.findAllByProject, projectId),
    );
  }

  async findOneDelivery(
    id: Delivery.FindOneDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponseDto> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponseDto,
        Delivery.FindOneDeliveryRequestDto
      >(Delivery.Message.findOne, id),
    );
  }

  async updateDelivery(
    updateDeliveryRequestDto: Delivery.UpdateDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponseDto> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponseDto,
        Delivery.UpdateDeliveryRequestDto
      >(Delivery.Message.update, updateDeliveryRequestDto),
    );
  }

  async removeDelivery(
    id: Delivery.FindOneDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponseDto> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponseDto,
        Delivery.FindOneDeliveryRequestDto
      >(Delivery.Message.delete, id),
    );
  }

  async createNewDeliveryFile(
    createDeliveryFileRequestDto: Delivery.createDeliveryFileRequestDto,
  ): Promise<Delivery.DeliveryResponseDto> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponseDto,
        Delivery.createDeliveryFileRequestDto
      >(Delivery.Message.createFile, createDeliveryFileRequestDto),
    );
  }

  async getAllFilesForDelivery(
    id: Delivery.FindOneDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponseDto> {
    return await firstValueFrom(
      this.deliveryService.send<
        Delivery.DeliveryResponseDto,
        Delivery.FindOneDeliveryRequestDto
      >(Delivery.Message.getAllFiles, id),
    );
  }
}
