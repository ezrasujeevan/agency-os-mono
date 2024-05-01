import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { CommonEntity } from '@agency-os/common';
import { HttpStatus } from '@nestjs/common';

export abstract class User extends CommonEntity {
  @ApiProperty({
    description: 'this is the email of user ',
    example: '008dfdb2-bc10-467e-99d4-14b58232ac35',
    title: 'ID',
  })
  id: string;
  @ApiProperty({
    description: 'this is the email of user ',
    example: 'john.doe@gmail.com',
    title: 'e-mail',
  })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'this is the First Name of user ',
    example: 'John',
    title: 'First Name',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'this is the Last Name of user ',
    example: 'Doe',
    title: 'Last Name',
    required: false,
    name: 'lastName',
  })
  lastName?: string;
}

export const Message = {
  create: 'createUser',
  update: 'updateUser',
  delete: 'deleteUser',
  findOneById: 'findOneUserById',
  findOneByEmail: 'findOneUserByEmail',
  findAll: 'findAllUser',
  validate: 'validateUserToken',
  login: 'loginUser',
  refresh: 'refreshUserToken',
  register: 'registerUser',
};

export const SERVICE_NAME = 'USER_SERVICE';
export type user = User | User[];
export interface UserResponseDto {
  status: HttpStatus;
  error?: string[] | string;
  user?: User | User[];
}

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'this is the email of user ',
    example: 'john.doe@gmail.com',
    title: 'e-mail',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'this is the password of user ',
    example: 'P@ssw0rd',
    title: 'Password',
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'this is the First Name of user ',
    example: 'John',
    title: 'First Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'this is the Last Name of user ',
    example: 'Doe',
    title: 'Last Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string;
}

export class FindOneUserByIdRequestDto {
  @ApiProperty({})
  @IsString()
  id: string;
}
export class FindOneUserByEmailRequestDto {
  @ApiProperty({})
  @IsString()
  email: string;
}

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  @ApiProperty({
    description: 'this is the id',
    example: 'a51861f8-c071-440f-b644-4d223a0628bf',
    title: 'ID',
  })
  @IsString()
  id: string;

  @ApiProperty()
  @Type(() => CreateUserRequestDto)
  Point?: CreateUserRequestDto;
}

export class LoginUserRequestDto {
  @ApiProperty({
    description: 'this is the email of user ',
    example: 'john.doe@gmail.com',
    title: 'e-mail',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'this is the password of user ',
    example: 'P@ssw0rd',
    title: 'Password',
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginUserResponseDto {
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
    title: 'Refesh Token',
  })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @ApiProperty({
    description: 'User ID',
    example: '',
    title: 'ID',
  })
  @IsString()
  @IsOptional()
  userId?: string;
}

export class ValidateUserRequestDto {
  @ApiProperty({
    description: 'JWT Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  token: string;
}

export class ValidateUserResponseDto {
  @ApiProperty({
    description: 'User ID of token ',
    example: '',
    title: 'User ID',
  })
  @IsString()
  userId?: string;

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

export class RefreshTokenUserRequestDto {
  @ApiProperty({
    description: 'JWT Refresh Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  refreshToken: string;
}
