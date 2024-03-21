import { User } from '@agency-os/proto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto implements User.CreateUserDto {
  email: string;
  password: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export class FindOneUserDto implements User.FindOneUserDto {
  id?: string;
  email?: string;
}

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements User.UpdateUserDto
{
  id: string;
}
