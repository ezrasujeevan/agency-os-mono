import { Delivery, Project } from '@agency-os/class';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeliveryRepository } from './delivery.repository';
import { DeliveryEntity, DeliveryFileEntity } from './delivery.entity';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DeliveryFileRepository } from './delivery.file.repository';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly deliveryRepo: DeliveryRepository,
    private readonly fileRepo: DeliveryFileRepository,
    @Inject(Project.SERVICE_NAME) private readonly projectClient: ClientProxy,
  ) {}
  async createDelivery(
    createDeliveryRequestDto: Delivery.CreateDeliveryRequestDto,
  ): Promise<Delivery.DeliveryResponseDto> {
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

  async findAllDelivery(): Promise<Delivery.DeliveryResponseDto> {
    const delivery = await this.deliveryRepo.findAll();
    if (delivery) {
      for (const del of delivery) {
        del.deliveryFiles = await this.getLatestDeliveryFile(del.id);
      }
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
  }: Delivery.FindAllDeliveryByProjectRequestDto): Promise<Delivery.DeliveryResponseDto> {
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
      for (const del of delivery) {
        del.deliveryFiles = await this.getLatestDeliveryFile(del.id);
      }
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
  }: Delivery.FindOneDeliveryRequestDto): Promise<Delivery.DeliveryResponseDto> {
    const delivery = await this.deliveryRepo.findOneById({ id });
    if (delivery) {
      delivery.deliveryFiles = await this.getLatestDeliveryFile(delivery.id);
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
  ): Promise<Delivery.DeliveryResponseDto> {
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
      delivery.deliveryFiles = await this.getLatestDeliveryFile(delivery.id);
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

  async removeDelivery({
    id,
  }: Delivery.FindOneDeliveryRequestDto): Promise<Delivery.DeliveryResponseDto> {
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

  async getAllFilesForDelivery({
    id,
  }: Delivery.FindOneDeliveryRequestDto): Promise<Delivery.DeliveryResponseDto> {
    const delivery = await this.deliveryRepo.findOneById({ id });
    if (delivery) {
      const files = await this.fileRepo.getAllFilesForDelivery({ id });
      delivery.deliveryFiles = files;
      return {
        status: HttpStatus.OK,
        delivery,
      };
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: 'No Delivery with Id: ' + id,
    };
  }

  async createNewDeliveryFile(create: Delivery.createDeliveryFileRequestDto) {
    const file = await this.fileRepo.createFile(create);
    if (file instanceof DeliveryFileEntity) {
      return {
        status: HttpStatus.CREATED,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: file,
      };
    }
  }
  private async getLatestDeliveryFile(
    deliveryId: string,
  ): Promise<DeliveryFileEntity[]> {
    const deliveryFiles = await this.fileRepo.getLatestFileForDelivery({
      id: deliveryId,
    });
    if (deliveryFiles) return [deliveryFiles];
    return [];
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
