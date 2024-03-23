import { ClientProto, UserProto } from '@agency-os/proto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { CommonEntity } from 'src/database/common.entity';

export abstract class Client
  extends CommonEntity
  implements ClientProto.Client
{
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

  @ApiProperty({
    description: 'this is the Comany ID of client ',
    example: '',
    title: 'Compnay',
  })
  company: string;
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
