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
    if (!(await this.checkProject(createDeliveryRequestDto.projectId))) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'No Project with Id: ' + createDeliveryRequestDto.projectId,
      };
    }
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
    if (!(await this.checkProject(projectId))) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'No Project with Id: ' + projectId,
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
    if (
      updateDeliveryRequestDto.projectId &&
      !(await this.checkProject(updateDeliveryRequestDto.projectId))
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'No Project with Id: ' + updateDeliveryRequestDto.projectId,
      };
    }
    const delivery = await this.deliveryRepo.update(updateDeliveryRequestDto);
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

  private async checkProject(projectId: string): Promise<boolean> {
    const project = await firstValueFrom(
      this.projectClient.send<
        Project.ProjectResponse,
        Project.FindOneProjectRequestByIdDto
      >(Project.Message.findOneById, {
        id: projectId,
      }),
    );
    return project.status === HttpStatus.OK;
  }
}
