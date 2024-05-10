import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MinLength, IsOptional } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { CommonEntity } from './common.entity';

export abstract class Company extends CommonEntity {
  @ApiProperty({
    description: 'This is the Name of the Company',
    example: 'Super Flat Studio',
    title: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'This is the Code of the Company',
    example: 'SFS',
    title: 'CODE',
  })
  code: string;
}

export const SERVICE_NAME = 'COMPANY_SERVICE';

export const Message = {
  create: 'createCompany',
  update: 'updateCompany',
  delete: 'deleteCompany',
  findOneById: 'findOneByIdCompany',
  findOneByCode: 'findOneByCodeCompany',
  findAll: 'findAllCompany',
};

export type company = Company | Company[];

export interface companyResponseDto {
  status: HttpStatus;
  error?: string | string[];
  company?: company;
}

export class CreateCompanyRequestDto {
  @ApiProperty({
    description: 'This is the Name of the Company',
    example: 'Super Flat Studio',
    title: 'Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'This is the Code of the Company',
    example: 'SFS',
    title: 'CODE',
  })
  @IsString()
  @MinLength(3)
  @MinLength(6)
  code: string;
}

export class FindOneCompanyByIdRequestDto {
  @ApiProperty({
    description: 'this is the id',
    example: 'a51861f8-c071-440f-b644-4d223a0628bf',
    title: 'ID',
  })
  @IsString()
  id: string;
}

export class findOneCompanyByCodeRequestDto {
  code: string;
}

export class UpdateCompanyRequestDto extends PartialType(CreateCompanyRequestDto) {
  @ApiProperty({
    description: 'this is the id',
    example: 'a51861f8-c071-440f-b644-4d223a0628bf',
    title: 'ID',
  })
  @IsString()
  id: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateCompanyRequestDto)
  Point?: CreateCompanyRequestDto;
}
