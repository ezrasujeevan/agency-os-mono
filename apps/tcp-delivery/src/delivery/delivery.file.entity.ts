import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Delivery } from '@agency-os/class';
import { DeliveryEntity } from './delivery.entity';

@Entity('delivery_file')
export class DeliveryFileEntity
  extends BaseEntity
  implements Delivery.DeliveryFile
{
  @PrimaryGeneratedColumn('uuid', { name: '_id' })
  id: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
  @VersionColumn({ name: '_v' })
  version: number;

  @ManyToOne(() => DeliveryEntity, (delivery) => delivery.id)
  @JoinColumn({ name: 'delivery_id' })
  delivery: DeliveryEntity;

  @Column({ name: 'file_version' })
  fileVersion: string;

  @Column('text', { name: 'file_url' })
  fileUrl: string;
}
