import { User as UserProto } from '@agency-os/proto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CommonEntity } from 'src/database/common.entity';

export class CreateUserDto implements UserProto.CreateUserDto {
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

export class FindOneUserDto implements UserProto.FindOneUserDto {
  @ApiProperty({})
  @IsString()
  @IsOptional()
  id?: string;
  @ApiProperty({})
  @IsString()
  @IsOptional()
  email?: string;
}

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements UserProto.UpdateUserDto
{
  @ApiProperty({
    description: 'this is the id',
    example: 'a51861f8-c071-440f-b644-4d223a0628bf',
    title: 'ID',
  })
  id: string;

  @ApiProperty()
  @Type(() => CreateUserDto)
  Point?: CreateUserDto;
}

export class UserClass extends CommonEntity implements UserProto.User {
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

export class Users implements UserProto.Users {
  @ApiProperty({})
  users: UserClass[];
}
