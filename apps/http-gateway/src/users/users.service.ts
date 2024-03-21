import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '@agency-os/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@agency-os/common';
@Injectable()
export class UsersService implements OnModuleInit {
  private userService: User.UserServiceClient;
  constructor(@Inject(User.protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<User.UserServiceClient>(
      User.USER_SERVICE_NAME,
    );
  }

  async create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async findAll() {
    return await this.userService.findAllUser({});
  }

  findOnebyUserId(id: string) {
    return this.userService.findOneUserbyId({ id });
  }

  findOnebyUserEmail(email: string) {
    return this.userService.findOneUserByEmail({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ ...updateUserDto, id });
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }
}
