import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Delivery } from '@agency-os/class';

@Entity('delivery')
export class DeliveryEntity extends BaseEntity implements Delivery.Delivery {
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

  @Column('uuid', { name: 'project_id' })
  projectId: string;

  @Column({ name: 'deliverable_name' })
  deliverableName: string;

  @Column({ name: 'deliverable_type' })
  deliverableType: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('varchar', { name: 'version' })
  deliverableVersion: number;

  @Column('text', { name: 'file_url', nullable: true })
  fileUrl: string;

  @Column('simple-array', { name: 'tags' })
  tags: string[];

  @Column('boolean', { name: 'access' })
  access: boolean;

  @Column('uuid', { name: 'created_by' })
  createdBy: string;
}
