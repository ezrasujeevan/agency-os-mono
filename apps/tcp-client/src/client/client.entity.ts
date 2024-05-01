import { Client } from '@agency-os/class';
import { CompanyEntity } from 'src/company/company.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('client')
export class ClientEntity extends BaseEntity implements Client.Client {
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

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @ManyToOne(() => CompanyEntity, (company) => company.clients, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
