import { ClientProto, UserProto } from '@agency-os/proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Client, User } from '@agency-os/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserProto.UserServiceClient;
  private clientService: ClientProto.ClientServiceClient;
  constructor(
    @Inject(UserProto.protobufPackage) private userGrpc: ClientGrpc,
    @Inject(ClientProto.protobufPackage) private clientGrpc: ClientGrpc,
  ) {}
  onModuleInit() {
    this.userService = this.userGrpc.getService<UserProto.UserServiceClient>(
      UserProto.USER_SERVICE_NAME,
    );
    this.clientService =
      this.clientGrpc.getService<ClientProto.ClientServiceClient>(
        ClientProto.CLIENT_SERVICE_NAME,
      );
  }

  async validateClient(
    validateClientRequestDto: Client.ValidateClientRequestDto,
  ): Promise<Client.ValidateClientResponseDto> {
    return firstValueFrom(
      await this.clientService.validateClient(validateClientRequestDto),
    );
  }
  async validateUser(
    validateUserRequestDto: User.ValidateUserRequestDto,
  ): Promise<User.ValidateUserResponseDto> {
    return firstValueFrom(
      await this.userService.validateUser(validateUserRequestDto),
    );
  }
}
