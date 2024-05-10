import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export abstract class CommonEntity {
  @ApiProperty({
    description: 'this is the id',
    example: 'a51861f8-c071-440f-b644-4d223a0628bf',
    title: 'ID',
  })
  @IsString()
  id: string;

  @Exclude()
  @IsDateString()
  createdAt: Date;

  @Exclude()
  @IsDateString()
  updatedAt: Date;

  @Exclude()
  @IsDateString()
  deletedAt: Date;

  @Exclude()
  @IsNumber()
  version: number;
}
