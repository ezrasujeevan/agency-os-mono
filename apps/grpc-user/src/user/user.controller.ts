import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserServiceControllerMethods } from '@agency-os/proto';
import {
  CreateUserRequestDto,
  FindOneUserByEmailRequestDto,
  FindOneUserByIdRequestDto,
  UpdateUserRequestDto,
} from '@agency-os/common';
@Controller()
@UserServiceControllerMethods()
export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    return await this.userService.create(createUserRequestDto);
  }

  async findAllUser({}) {
    return await this.userService.findAll();
  }

  async findOneUserbyId(findOneUserByIdRequestDto: FindOneUserByIdRequestDto) {
    return await this.userService.findOne(findOneUserByIdRequestDto);
  }

  async findOneUserByEmail(
    findOneUserByEmailRequestDto: FindOneUserByEmailRequestDto,
  ) {
    return await this.userService.findOne(findOneUserByEmailRequestDto);
  }

  async updateUser(updateUserRequestDto: UpdateUserRequestDto) {
    return await this.userService.update(
      updateUserRequestDto.id,
      updateUserRequestDto,
    );
  }

  async removeUser(findOneUserByIdRequestDto: FindOneUserByIdRequestDto) {
    return await this.userService.remove(findOneUserByIdRequestDto);
  }
}
