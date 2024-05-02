import { ClientProto } from '@agency-os/proto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsString, MinLength, IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Company } from './company';
import { CommonEntity } from '@agency-os/common';
import { HttpStatus } from '@nestjs/common';

export abstract class Client extends CommonEntity {
  @ApiProperty({
    description: 'this is the email of Client ',
    example: 'john.doe@gmail.com',
    title: 'e-mail',
  })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'this is the First Name of Client ',
    example: 'John',
    title: 'First Name',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'this is the Last Name of Client ',
    example: 'Doe',
    title: 'Last Name',
    required: false,
    name: 'lastName',
  })
  lastName?: string;

  @ApiProperty({
    description: "this is the ID of Client's Company ",
    example: 'Doe',
    title: 'Last Name',
    name: 'lastName',
  })
  companyId: string;
}

export const SERVICE_NAME = 'CLIENT_SERVICE';
export const Message = {
  create: 'createClient',
  findAll: 'findAllClient',
  findAllOfCompany: 'findAllOfCompanyClient',
  findOneById: 'findOneByIdClient',
  findOneByEmail: 'findOneByEmailClient',
  update: 'updateClient',
  delete: 'deleteClient',
  register: 'registerClient',
  login: 'loginClient',
  validate: 'validateClient',
  refresh: 'refreshClient',
};
export type client = Client | Client[];

export interface ClientResponseDto {
  status: HttpStatus;
  error?: string | string[];
  client?: client;
}

export class findAllOfCompanyRequestDto {
  companyId: string;
}

export class CreateClientRequestDto {
  @ApiProperty({
    description: 'this is the email of Client ',
    example: 'john.doe@gmail.com',
    title: 'e-mail',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'this is the password of Client ',
    example: 'P@ssw0rd',
    title: 'Password',
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'this is the First Name of Client ',
    example: 'John',
    title: 'First Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'this is the Last Name of Client ',
    example: 'Doe',
    title: 'Last Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  companyId: string;
}

export class UpdateClientRequestDto extends PartialType(CreateClientRequestDto) {
  @ApiProperty({
    description: 'this is the id',
    example: 'a51861f8-c071-440f-b644-4d223a0628bf',
    title: 'ID',
  })
  @IsString()
  id: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateClientRequestDto)
  Point?: CreateClientRequestDto;
}

export class FindOneClientByIdRequestDto {
  @ApiProperty({})
  @IsString()
  id: string;
}
export class FindOneClientByEmailRequestDto {
  @ApiProperty({})
  @IsString()
  email: string;
}

export class LoginClientRequestDto {
  @ApiProperty({
    description: 'this is the email of Client ',
    example: 'john.doe@gmail.com',
    title: 'e-mail',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'this is the password of Client ',
    example: 'P@ssw0rd',
    title: 'Password',
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginClientResponseDto {
  @ApiProperty({
    description: 'HTTP Status ',
    example: '200',
    title: 'Status',
  })
  @IsNumber()
  status: number;

  @ApiProperty({
    description: 'Errors ',
    example: '',
    title: 'Error',
    isArray: true,
  })
  @IsString()
  @IsOptional()
  error?: string[] | string;

  @ApiProperty({
    description: 'JWT Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  @IsOptional()
  token?: string;

  @ApiProperty({
    description: 'JWT Refesh Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @ApiProperty({
    description: 'Client ID ',
    example: '',
    title: 'ID',
  })
  @IsString()
  @IsOptional()
  clientId?: string;
}
export class ValidateClientRequestDto {
  @ApiProperty({
    description: 'JWT Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  token: string;
}

export class ValidateClientResponseDto {
  @ApiProperty({
    description: 'Company ID of token ',
    example: '',
    title: 'Company ID',
  })
  @IsString()
  compnayId?: string;

  @ApiProperty({
    description: 'Client ID of token ',
    example: '',
    title: 'Client ID',
  })
  @IsString()
  clientId?: string;

  @ApiProperty({
    description: 'HTTP Status ',
    example: '200',
    title: 'Status',
  })
  @IsNumber()
  status: number;

  @ApiProperty({
    description: 'Errors ',
    example: '',
    title: 'Error',
    isArray: true,
  })
  @IsString()
  @IsOptional()
  error?: string[] | string;
}

export class RefreshTokenClientRequestDto {
  @ApiProperty({
    description: 'JWT Refresh Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  refreshToken: string;
}
