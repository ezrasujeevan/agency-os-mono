import { Client } from '@agency-os/class';
import { Inject, Injectable } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthClientService {
  constructor(@Inject(Client.SERVICE_NAME) private userClient: ClientTCP) {}
  async loginClient(loginClientRequestDto: Client.LoginClientRequestDto) {
    return await firstValueFrom(
      this.userClient.send<
        Client.ClientResponseDto,
        Client.LoginClientRequestDto
      >(Client.Message.login, loginClientRequestDto),
    );
  }

  async registerClient(createClientRequestDto: Client.CreateClientRequestDto) {
    return await firstValueFrom(
      this.userClient.send<
        Client.ClientResponseDto,
        Client.CreateClientRequestDto
      >(Client.Message.register, createClientRequestDto),
    );
  }

  async validateClient(
    validateClientRequestDto: Client.ValidateClientRequestDto,
  ) {
    return await firstValueFrom(
      this.userClient.send<
        Client.ClientResponseDto,
        Client.ValidateClientRequestDto
      >(Client.Message.validate, validateClientRequestDto),
    );
  }

  async refreshTokenClient(
    refreshTokenClientRequestDto: Client.RefreshTokenClientRequestDto,
  ) {
    return await firstValueFrom(
      this.userClient.send<
        Client.ClientResponseDto,
        Client.RefreshTokenClientRequestDto
      >(Client.Message.refresh, refreshTokenClientRequestDto),
    );
  }
}
