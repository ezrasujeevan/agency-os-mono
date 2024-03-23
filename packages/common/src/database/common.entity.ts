import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @IsDateString()
  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;

  @Exclude()
  @IsDateString()
  @DeleteDateColumn({ name: 'deleted_at' })
  DeletedAt: Date;

  @Exclude()
  @IsNumber()
  @VersionColumn({ name: '_v' })
  version: number;
}
