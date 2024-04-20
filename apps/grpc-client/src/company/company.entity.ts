import { Company } from '@agency-os/common';
import { ClientEntity } from '../client/client.entity';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('company')
export class CompanyEntity extends BaseEntity implements Company.Company {
  @PrimaryGeneratedColumn('uuid', { name: '_id' })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  DeletedAt: Date;

  @VersionColumn({ name: '_v' })
  version: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  code: string;

  @OneToMany(() => ClientEntity, (client) => client.company, { lazy: true })
  clients: ClientEntity[];
}
