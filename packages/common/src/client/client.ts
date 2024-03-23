import { ClientProto } from '@agency-os/proto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CommonEntity } from 'src/database/common.entity';

export abstract class Client
  extends CommonEntity
  implements ClientProto.Client
{
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
  company: string;
}

export class CreateClientRequestDto implements ClientProto.CreateClientRequest {
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
}

export class UpdateClientRequest
  extends PartialType(CreateClientRequestDto)
  implements ClientProto.UpdateClientRequest
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
  @Type(() => CreateClientRequestDto)
  Point?: CreateClientRequestDto;
}

export class FindOneClientByIdRequestDto
  implements ClientProto.FindOneClientByIdRequest
{
  @ApiProperty({})
  @IsString()
  id: string;
}
export class FindOneClientByEmailRequestDto
  implements ClientProto.FindOneClientByEmailRequest
{
  @ApiProperty({})
  @IsString()
  email: string;
}

export class LoginClientRequestDto implements ClientProto.LoginClientRequest {
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

export class LoginClientResponceDto implements ClientProto.LoginClientResponse {
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
  error: string[];

  @ApiProperty({
    description: 'JWT Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  @IsOptional()
  token: string;
}
export class ValidateClientRequestDto
  implements ClientProto.ValidateClientRequest
{
  @ApiProperty({
    description: 'JWT Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  token: string;
}

export class ValidateClientResponseDto
  implements ClientProto.ValidateClientResponse
{
  clientId: string;
  @ApiProperty({
    description: 'Client ID of token ',
    example: '',
    title: 'Client ID',
  })
  @IsString()
  ClientId: string;

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
  error: string[];
  @ApiProperty({
    description: 'JWT Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  token: string;
}

export class RegisterClientResponseDto
  implements ClientProto.RegisterClientResponse
{
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
  error: string[];
}
export class Clients implements ClientProto.Clients {
  @ApiProperty({
    description: 'List Of Clients ',
    example: '',
    title: 'Clients',
    isArray: true,
  })
  @IsString()
  @IsOptional()
  clients: Client[];
}
