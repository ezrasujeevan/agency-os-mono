import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Delivery } from './delivery';
import { CommonEntity } from '@agency-os/common';
import { ApiProperty } from '@nestjs/swagger';

export abstract class SupportingAsset extends CommonEntity {
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

  @ApiProperty({})
  fileURL: string;

  @ApiProperty({})
  access: boolean;

  @ApiProperty({
    description: 'The ID of the user who created the asset',
    example: '456',
    title: 'Created By',
  })
  createdBy: string;
}
