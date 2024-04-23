import { CommonEntity } from '@agency-os/common';
import { ApiProperty } from '@nestjs/swagger';

export abstract class Delivery extends CommonEntity {
  @ApiProperty({
    description: 'The ID of the project',
    example: '456',
    title: 'Project ID',
  })
  projectId: string;

  @ApiProperty({
    description: 'The name of the deliverable',
    example: 'My Deliverable',
    title: 'Deliverable Name',
  })
  deliverableName: string;

  @ApiProperty({
    description: 'The type of the deliverable',
    example: 'Document',
    title: 'Deliverable Type',
  })
  deliverableType: string;

  @ApiProperty({
    description: 'The description of the deliverable',
    example: 'This is a sample deliverable',
    title: 'Description',
  })
  description: string;

  @ApiProperty({
    description: 'The version of the deliverable',
    example: 1,
    title: 'Deliverable Version',
  })
  deliverableVersion: number;

  @ApiProperty({
    description: 'The URL of the deliverable file',
    example: 'https://example.com/file.pdf',
    title: 'File URL',
  })
  fileUrl: string;

  @ApiProperty({
    description: 'The tags associated with the deliverable',
    example: ['tag1', 'tag2'],
    title: 'Tags',
  })
  tags: string[];

  @ApiProperty({
    description: 'The access status of the deliverable',
    example: true,
    title: 'Access',
  })
  access: boolean;

  @ApiProperty({
    description: 'The username of the creator',
    example: 'john.doe',
    title: 'Created By',
  })
  createdBy: string;
}
