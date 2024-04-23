import { CommonEntity } from '@agency-os/common';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../client/client';
import { User } from '../user/user';
import { Company } from '../client/company';

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
  endDate?: Date | null | undefined;

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
  brandManagerId: string;

  @ApiProperty({
    description: 'this is the Project Manager of project ',
    example: 'John Doe',
    title: 'Project Manager',
  })
  projectManagerId: string;

  @ApiProperty({
    description: 'this is the Organization of project ',
    example: 'Super Flat Studio(SFS)',
    title: 'Organization',
  })
  organizationId: string;
}
