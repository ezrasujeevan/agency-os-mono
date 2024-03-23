import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProto } from '@agency-os/proto';
import { User } from '@agency-os/common';
@Controller()
@UserProto.UserServiceControllerMethods()
export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserRequestDto: User.CreateUserRequestDto) {
    return await this.userService.create(createUserRequestDto);
  }

  async findAllUser({}) {
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
}
