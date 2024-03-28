import { UserProto } from '@agency-os/proto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CommonEntity } from 'src/database/common.entity';

export abstract class User extends CommonEntity implements UserProto.User {
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

export class CreateUserRequestDto implements UserProto.CreateUserRequest {
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

export class FindOneUserByIdRequestDto
  implements UserProto.FindOneUserByIdRequest
{
  @ApiProperty({})
  @IsString()
  id: string;
}
export class FindOneUserByEmailRequestDto
  implements UserProto.FindOneUserByEmailRequest
{
  @ApiProperty({})
  @IsString()
  email: string;
}

export class UpdateUserRequestDto
  extends PartialType(CreateUserRequestDto)
  implements UserProto.UpdateUserRequest
{
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

export class LoginUserRequestDto implements UserProto.LoginUserRequest {
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

export class LoginUserResponceDto implements UserProto.LoginUserResponse {
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
export class ValidateUserRequestDto implements UserProto.ValidateUserRequest {
  @ApiProperty({
    description: 'JWT Token ',
    example: '',
    title: 'Token',
  })
  @IsString()
  token: string;
}

export class ValidateUserResponseDto implements UserProto.ValidateUserResponse {
  @ApiProperty({
    description: 'User ID of token ',
    example: '',
    title: 'User ID',
  })
  @IsString()
  userId: string;

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

export class RegisterUserResponseDto implements UserProto.RegisterUserResponse {
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

export class Users implements UserProto.Users {
  @ApiProperty({
    description: 'List Of Users ',
    example: '',
    title: 'Users',
    isArray: true,
  })
  @IsString()
  @IsOptional()
  users: User[];
}
