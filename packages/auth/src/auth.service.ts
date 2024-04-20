import { ClientProto, UserProto } from '@agency-os/proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Client, User } from '@agency-os/class';
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

  async registerClient(createClientDto: Client.CreateClientRequestDto) {
    return await firstValueFrom(
      await this.clientService.createClient(createClientDto),
    );
  }

  async registerUser(createUserDto: User.CreateUserRequestDto) {
    return await firstValueFrom(
      await this.userService.createUser(createUserDto),
    );
  }

  async loginClient(loginClientDto: Client.LoginClientRequestDto) {
    return await firstValueFrom(
      await this.clientService.loginClient(loginClientDto),
    );
  }

  async loginUser(loginUserDto: User.LoginUserRequestDto) {
    return await firstValueFrom(await this.userService.loginUser(loginUserDto));
  }

  getHello(): string {
    return 'hello from atuh service';
  }
}
