import { Project } from '@agency-os/class';

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

@Entity({ name: 'project' })
export class ProjectEntity extends BaseEntity implements Project.Project {
  @PrimaryGeneratedColumn('uuid', { name: '_id' })
  id: string;

  @Column({ name: 'trial_name', unique: true })
  trialName: string;

  @Column()
  name: string;

  @Column({ name: 'opportunity_date' })
  opportunityDate: Date;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date', nullable: true, type: 'date' })
  endDate?: Date | null;

  @Column({ name: 'project_value' })
  projectValue: number;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: Project.ProjectStatus,
    default: Project.ProjectStatus.INACTIVE,
  })
  status: Project.ProjectStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn({ name: '_v' })
  version: number;
}
