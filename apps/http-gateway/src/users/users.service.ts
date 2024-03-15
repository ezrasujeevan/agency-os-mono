import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '@agency-os/proto';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: User.UserServiceClient;
  constructor(@Inject(User.protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<User.UserServiceClient>(
      User.USER_SERVICE_NAME,
    );
  }

  async create(createUserDto: User.CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    return this.userService.findAllUser({});
  }

  findOne(id: string) {
    return this.userService.findOneUserbyId({ id });
  }

  update(id: string, updateUserDto: User.UpdateUserDto) {
    return this.userService.updateUser({ ...updateUserDto, id });
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }
}
