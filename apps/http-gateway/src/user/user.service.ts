import { Inject, Injectable } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { User } from '@agency-os/class';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class UserService {
  constructor(@Inject(User.SERVICE_NAME) private userClient: ClientTCP) {}

  async create(createUserDto: User.CreateUserRequestDto) {
    return await firstValueFrom(
      this.userClient.send<User.UserResponseDto, User.CreateUserRequestDto>(
        User.Message.create,
        createUserDto,
      ),
    );
  }

  async findAll() {
    return await firstValueFrom(
      this.userClient.send<User.UserResponseDto, object>(
        User.Message.findAll,
        {},
      ),
    );
  }

  async findOneUserById(
    findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto,
  ) {
    return await firstValueFrom(
      this.userClient.send<
        User.UserResponseDto,
        User.FindOneUserByIdRequestDto
      >(User.Message.findOneById, findOneUserByIdRequestDto),
    );
  }

  async findOneUserByEmail(
    findOneUserByEmailRequestDto: User.FindOneUserByEmailRequestDto,
  ) {
    return await firstValueFrom(
      this.userClient.send<
        User.UserResponseDto,
        User.FindOneUserByEmailRequestDto
      >(User.Message.findOneByEmail, findOneUserByEmailRequestDto),
    );
  }

  async update(updateUserRequestDto: User.UpdateUserRequestDto) {
    return await firstValueFrom(
      this.userClient.send<User.UserResponseDto, User.UpdateUserRequestDto>(
        User.Message.update,
        updateUserRequestDto,
      ),
    );
  }

  async remove(findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto) {
    return await firstValueFrom(
      this.userClient.send<
        User.UserResponseDto,
        User.FindOneUserByIdRequestDto
      >(User.Message.delete, findOneUserByIdRequestDto),
    );
  }
}
