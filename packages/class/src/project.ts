import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { HttpStatus } from '@nestjs/common';
import { CommonEntity } from './common.entity';

export enum ProjectStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  PENDING = 'pending',
  BlOCKED = 'blocked',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
}
export abstract class Project extends CommonEntity {
  @ApiProperty({
    description: 'this is the name of project ',
    example: '008dfdb2-bc10-467e-99d4-14b58232ac35',
    title: 'ID',
  })
  id: string;

  @ApiProperty({
    description: 'this is internal name of project ',
    example: 'Project 1 lorem ipsum',
    title: 'Name',
  })
  trialName: string;

  @ApiProperty({
    description: 'this is the name of project ',
    example: 'Project 1',
    title: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'Date the opportunity for the project arose',
    example: '2024-01-24',
    title: 'Opportunity Date',
  })
  opportunityDate: Date;

  @ApiProperty({
    description: 'Start Date for the project',
    example: '2024-01-24',
    title: 'Start Date',
  })
  startDate: Date;

  @ApiProperty({
    description: 'End Date for the project',
    example: '2024-01-24',
    title: 'Start Date',
    required: false,
  })
  endDate?: Date | null;

  @ApiProperty({
    description: 'Value of the project (e.g., budget, revenue)',
    example: '$ 420.00',
    title: 'Project Value',
  })
  projectValue: number;

  @ApiProperty({
    description: 'this is the Brand Manager of project ',
    example: 'John Doe',
    title: 'Brand Manager',
  })
  clientId: string;

  @ApiProperty({
    description: 'this is the Project Manager of project ',
    example: 'John Doe',
    title: 'Project Manager',
  })
  userId: string;

  @ApiProperty({
    description: 'this is the Organization of project ',
    example: 'Super Flat Studio(SFS)',
    title: 'Organization',
  })
  companyId: string;

  status: ProjectStatus;
}

export const SERVICE_NAME = 'PROJECT_SERVICE';
export const Message = {
  create: 'createProject',
  findAll: 'findAllProject',
  findAllByClient: 'findAllProjectByClient',
  findAllByCompany: 'findAllProjectByCompany',
  findAllByUser: 'findAllByUser',
  findOneById: 'findOneProjectById',
  findOneByTrialName: 'findOneProjectByTrialName',
  update: 'updateProject',
  remove: 'removeProject',
};

export type project = Project | Project[];

export interface ProjectResponse {
  status: HttpStatus;
  project?: project;
  error?: string[] | string;
}

export class CreateProjectRequestDto {
  trialName: string;
  name: string;
  opportunityDate: Date;
  startDate: Date;
  endDate?: Date;
  projectValue: number;
  clientId: string;
  userId: string;
  companyId: string;
}

export class UpdateProjectRequestDto extends PartialType(CreateProjectRequestDto) {
  id: string;
  status?: ProjectStatus;
}

export class FindOneProjectRequestByIdDto {
  id: string;
}

export class FindOneProjectRequestByTrialNameDto {
  trialName: string;
}

export class FindAllProjectByCompanyRequestDto {
  companyId: string;
}

export class FindAllProjectByUserRequestDto {
  userId: string;
}

export class FindAllProjectByClientRequestDto {
  clientId: string;
}
