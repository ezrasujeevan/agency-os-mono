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

    return { users: await this.userService.findAll({}) };
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

  async registerUser(
    createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.RegisterUserResponseDto> {
    return await this.userService.register(createUserRequestDto);
  }

  async loginUser(
    loginUserRequestDto: User.LoginUserRequestDto,
  ): Promise<User.LoginUserResponceDto> {
    return await this.userService.login(loginUserRequestDto);
  }

  async validateUser(
    validateUserRequestDto: User.ValidateUserRequestDto,
  ): Promise<User.ValidateUserResponseDto> {
    return await this.userService.validate(validateUserRequestDto);
  }
}
