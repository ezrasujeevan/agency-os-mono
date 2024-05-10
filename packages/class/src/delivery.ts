import { HttpStatus } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from './common.entity';

export const SERVICE_NAME = 'DELIVERY_SERVICE';
export const Message = {
  create: 'CreateDelivery',
  update: 'UpdateDelivery',
  delete: 'DeleteDelivery',
  findOne: 'FindOneDelivery',
  findAll: 'FindAllDelivery',
  findAllByProject: 'FindAllDeliveryByProject',
  createFile: 'CreateDeliveryFile',
  getAllFiles: 'getAllFilesForDelivery',
};

export type delivery = Delivery | Delivery[];
export interface DeliveryResponseDto {
  status: HttpStatus;
  error?: string | string[];
  delivery?: delivery;
}

export abstract class DeliveryFile extends CommonEntity {
  delivery: Delivery;
  fileVersion: string;
  fileUrl: string;
}

export abstract class Delivery extends CommonEntity {
  @ApiProperty({
    description: 'The ID of the project',
    example: '456',
    title: 'Project ID',
  })
  projectId: string;

  @ApiProperty({
    description: 'The name of the deliverable',
    example: 'My Deliverable',
    title: 'Deliverable Name',
  })
  deliverableName: string;

  @ApiProperty({
    description: 'The type of the deliverable',
    example: 'Document',
    title: 'Deliverable Type',
  })
  deliverableType: string;

  @ApiProperty({
    description: 'The description of the deliverable',
    example: 'This is a sample deliverable',
    title: 'Description',
  })
  description: string;

  @ApiProperty({
    description: 'The tags associated with the deliverable',
    example: ['tag1', 'tag2'],
    title: 'Tags',
  })
  tags: string[];

  @ApiProperty({
    description: 'If accessible by Client',
    example: true,
    title: 'Access',
  })
  access: boolean;

  @ApiProperty({
    description: 'The username of the creator',
    example: 'john.doe',
    title: 'Created By',
  })
  createdBy: string;

  deliveryFiles: DeliveryFile[];
}

export class CreateDeliveryRequestDto {
  projectId: string;
  deliverableName: string;
  deliverableType: string;
  description: string;
  tags: string[];
  access: boolean;
  createdBy: string;
}

export class createDeliveryFileRequestDto {
  deliveryId: string;
  fileVersion: string;
  fileUrl: string;
}

export class UpdateDeliveryRequestDto extends PartialType(CreateDeliveryRequestDto) {
  id: string;
}

export class FindOneDeliveryRequestDto {
  id: string;
}

export class FindAllDeliveryByProjectRequestDto {
  projectId: string;
}
