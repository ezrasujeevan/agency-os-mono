import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Asset } from '@agency-os/class';

//asset.repository.ts
@Entity('assets')
export class AssetEntity extends BaseEntity implements Asset.Asset {
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

  @Column('uuid', { name: 'delivery_id' })
  deliveryId: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'type' })
  type: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('text', { name: 'file_url', nullable: true })
  fileURL: string;

  @Column('boolean', { name: 'access', default: false })
  access: boolean;

  @Column('uuid', { name: 'created_by' })
  createdBy: string;
}
