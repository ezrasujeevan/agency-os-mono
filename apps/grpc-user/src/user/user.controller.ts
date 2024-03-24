/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProto } from '@agency-os/proto';
import { User } from '@agency-os/common';
import { log } from 'console';
@Controller()
@UserProto.UserServiceControllerMethods()
export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserRequestDto: User.CreateUserRequestDto) {
    return await this.userService.create(createUserRequestDto);
  }

  async findAllUser({}, metadata: Metadata) {
    log(metadata);
    return await this.userService.findAll();
  }

  async findOneUserbyId(
    findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto,
  ) {
    return await this.userService.findOneById(findOneUserByIdRequestDto);
  }

  async findOneUserByEmail(
    findOneUserByEmailRequestDto: User.FindOneUserByEmailRequestDto,
  ) {
    return await this.userService.findOneByEmail(findOneUserByEmailRequestDto);
  }

  async updateUser(updateUserRequestDto: User.UpdateUserRequestDto) {
    return await this.userService.update(
      updateUserRequestDto.id,
      updateUserRequestDto,
    );
  }

  async removeUser(findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto) {
    return await this.userService.remove(findOneUserByIdRequestDto);
  }

  async registerUser(createUserRequestDto: User.CreateUserRequestDto) {}
  async loginUser(createUserRequestDto: User.CreateUserRequestDto) {}
  async validateUser(createUserRequestDto: User.CreateUserRequestDto) {}
}
