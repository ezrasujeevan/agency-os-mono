import { ClientProto } from '@agency-os/proto';
import { CommonEntity } from '@agency-os/common';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MinLength, IsOptional } from 'class-validator';

export abstract class Company
  extends CommonEntity
  implements ClientProto.Company
{
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

  clients: ClientProto.Client[];
}

export class CreateCompanyRequestDto
  implements ClientProto.CreateCompanyRequest
{
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

export class FindOneCompanyRequestDto
  implements ClientProto.FindOneCompanyRequest
{
  @ApiProperty({
    description: 'this is the id',
    example: 'a51861f8-c071-440f-b644-4d223a0628bf',
    title: 'ID',
  })
  @IsString()
  id: string;
}

export class UpdateCompanyRequestDto
  extends PartialType(CreateCompanyRequestDto)
  implements ClientProto.UpdateCompanyRequest
{
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

export class Companys implements ClientProto.Companys {
  @ApiProperty({
    description: 'List Of Companys ',
    example: '',
    title: 'Comnays',
    isArray: true,
  })
  @IsString()
  @IsOptional()
  companys: ClientProto.Company[];
}
