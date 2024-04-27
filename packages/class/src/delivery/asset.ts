import { Delivery } from './delivery';
import { CommonEntity } from '@agency-os/common';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { HttpStatus } from '@nestjs/common';

export abstract class Asset extends CommonEntity {
  @ApiProperty({
    description: 'The ID of the delivery',
    example: '456',
    title: 'Delivery ID',
  })
  delivery: Delivery;

  @ApiProperty({
    description: 'The name of the asset',
    example: 'My Asset',
    title: 'Asset Name',
  })
  name: string;

  @ApiProperty({
    description: 'The type of the asset',
    example: 'Document',
    title: 'Asset Type',
  })
  type: string;

  @ApiProperty({
    description: 'The description of the asset',
    example: 'This is a sample asset',
    title: 'Description',
  })
  description: string;

  @ApiProperty({
    description: 'The URL of the asset',
    example: 'https://www.google.com',
    title: 'File URL',
  })
  fileURL: string;

  @ApiProperty({
    description: 'IF accessible by Client',
    example: 'true',
    title: 'Access',
  })
  access: boolean;

  @ApiProperty({
    description: 'The ID of the user who created the asset',
    example: '456',
    title: 'Created By',
  })
  createdBy: string;
}

export class CreateAssetRequestDto {
  @ApiProperty({
    description: 'The ID of the delivery',
    example: '456',
    title: 'Delivery ID',
  })
  delivery: Delivery;

  @ApiProperty({
    description: 'The name of the asset',
    example: 'My Asset',
    title: 'Asset Name',
  })
  name: string;

  @ApiProperty({
    description: 'The type of the asset',
    example: 'Document',
    title: 'Asset Type',
  })
  type: string;

  @ApiProperty({
    description: 'The description of the asset',
    example: 'This is a sample asset',
    title: 'Description',
  })
  description: string;

  @ApiProperty({
    description: 'The URL of the asset',
    example: 'https://www.google.com',
    title: 'File URL',
  })
  fileURL: string;

  @ApiProperty({
    description: 'IF accessible by Client',
    example: 'true',
    title: 'Access',
  })
  access: boolean;

  @ApiProperty({
    description: 'The ID of the user who created the asset',
    example: '456',
    title: 'Created By',
  })
  createdBy: string;
}

export class UpdateAssetRequestDto extends PartialType(CreateAssetRequestDto) {
  @ApiProperty({
    description: 'The ID of the asset',
    example: '456',
    title: 'Asset ID',
  })
  id: string;
}

export class FindOneAssetRequestDto {
  @ApiProperty({
    description: 'The ID of the asset',
    example: '456',
    title: 'Asset ID',
  })
  id: string;
}

export class FindAllAssetsOfDeliveryRequestDto {
  @ApiProperty({
    description: 'The ID of the delivery',
    example: '456',
    title: 'Delivery ID',
  })
  deliveryId: string;
}

export const Message = {
  create: 'createAsset',
  update: 'updateAsset',
  delete: 'deleteAsset',
  findAll: 'findAllAssets',
  findAllByDelivery: 'findAllAssetsByDelivery',
  findOne: 'findOneAsset',
};

export type asset = Asset | Asset[];

export interface AssetResponseDto {
  status: HttpStatus;
  error?: string | string[];
  asset?: asset;
}
