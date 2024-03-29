import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserProto } from '@agency-os/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { User } from '@agency-os/common';
@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserProto.UserServiceClient;
  constructor(@Inject(UserProto.protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserProto.UserServiceClient>(
      UserProto.USER_SERVICE_NAME,
    );
  }

  async create(createUserDto: User.CreateUserRequestDto) {
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

  update(id: string, updateUserDto: User.UpdateUserRequestDto) {
    return this.userService.updateUser({ ...updateUserDto, id });
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }
}
