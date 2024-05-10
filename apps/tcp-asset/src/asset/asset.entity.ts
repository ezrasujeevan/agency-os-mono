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

  @Column('boolean', { name: 'access', default: false })
  access: boolean;

  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @ManyToOne(() => AssetFileEntity, (assetFile) => assetFile.asset)
  assetFile: AssetFileEntity[];
}
@Entity('asset_file')
export class AssetFileEntity extends BaseEntity implements Asset.AssetFile {
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

  @OneToMany(() => AssetEntity, (asset) => asset.assetFile)
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  @Column({ name: 'file_version' })
  fileVersion: string;

  @Column('text', { name: 'file_url' })
  fileUrl: string;
}
