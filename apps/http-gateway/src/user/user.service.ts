import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserProto } from '@agency-os/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { User } from '@agency-os/class';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { GRPC } from 'src/constants';
@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserProto.UserServiceClient;
  constructor(@Inject(GRPC.USER_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserProto.UserServiceClient>(
      UserProto.USER_SERVICE_NAME,
    );
  }

  async create(createUserDto: User.CreateUserRequestDto) {
    return this.userService.createUser(createUserDto);
  }

  async findAll({}, metadata: Metadata) {
    return await firstValueFrom(
      await this.userService.findAllUser({}, metadata),
    );
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
