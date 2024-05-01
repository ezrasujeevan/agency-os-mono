import { Delivery, Project } from '@agency-os/class';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeliveryRepository } from './delivery.repository';
import { DeliveryEntity } from './delivery.entity';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly deliveryRepo: DeliveryRepository,
    @Inject(Project.SERVICE_NAME) private readonly projectClient: ClientProxy,
  ) {}
  async createDelivery(
    createDeliveryRequestDto: Delivery.CreateDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponse> {
    const delivery = await this.deliveryRepo.create(createDeliveryRequestDto);
    if (delivery instanceof DeliveryEntity) {
      return {
        status: HttpStatus.CREATED,
        delivery,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: delivery.name + ' - ' + delivery.message,
      };
    }
  }

  async findAllDelivery(): Promise<Delivery.DeliveryResponse> {
    const delivery = await this.deliveryRepo.findAll();
    if (delivery) {
      return {
        status: HttpStatus.OK,
        delivery,
      };
    } else {
      return {
        status: HttpStatus.NO_CONTENT,
      };
    }
  }

  async findAllDeliveryByProject({
    projectId,
  }: Delivery.FindAllDeliveryByProjectRequestDto): Promise<Delivery.DeliveryResponse> {
    const project = await firstValueFrom(
      await this.projectClient.send<
        Project.ProjectResponse,
        Project.FindOneProjectRequestByIdDto
      >(Project.Message.findOneById, { id: projectId }),
    );
    if (project.status === HttpStatus.NO_CONTENT) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'No Project with Id: ' + projectId,
      };
    }
    if (project.status !== HttpStatus.OK) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: project.error,
      };
    }
    const delivery = await this.deliveryRepo.findAllByProject({
      projectId,
    });
    if (delivery) {
      return {
        status: HttpStatus.OK,
        delivery,
      };
    } else {
      return {
        status: HttpStatus.NO_CONTENT,
      };
    }
  }

  async findOneDelivery({
    id,
  }: Delivery.FindOneDeliveryRequestDto): Promise<Delivery.DeliveryResponse> {
    const delivery = await this.deliveryRepo.findOneById({ id });
    if (delivery) {
      return {
        status: HttpStatus.OK,
        delivery,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'No Delivery with Id: ' + id,
      };
    }
  }

  async updateDelivery(
    updateDeliveryRequestDto: Delivery.UpdateDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponse> {
    const delivery = await this.deliveryRepo.update(
      updateDeliveryRequestDto.id,
      updateDeliveryRequestDto,
    );
    if (delivery instanceof DeliveryEntity) {
      return {
        status: HttpStatus.OK,
        delivery,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: delivery.name + ' - ' + delivery.message,
      };
    }
  }

  async removeDelivery({ id }: Delivery.FindOneDeliveryRequestDto) {
    const delivery = await this.deliveryRepo.remove({ id });
    if (delivery instanceof DeliveryEntity) {
      return {
        status: HttpStatus.OK,
        delivery,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: delivery.name + ' - ' + delivery.message,
      };
    }
  }
}
