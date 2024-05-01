import { Controller } from '@nestjs/common';
import { ClientService } from './client.service';

import { Client } from '@agency-os/class';
import { ClientProto } from '@agency-os/proto';

@Controller()
@ClientProto.ClientServiceControllerMethods()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  createClient(createClientRequestDto: Client.CreateClientRequestDto) {
    return this.clientService.create(createClientRequestDto);
  }

  findAllClient({}) {
    return this.clientService.findAll();
  }

  findOneClientbyId(
    findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto,
  ) {
    return this.clientService.findOneById(findOneClientByIdRequestDto);
  }
  findOneClientByEmail(
    findOneClientByEmailRequestDto: Client.FindOneClientByEmailRequestDto,
  ) {
    return this.clientService.findOneByEmail(findOneClientByEmailRequestDto);
  }

  updateClient(updateClientRequestDto: Client.UpdateClientRequestDto) {
    return this.clientService.update(
      updateClientRequestDto.id,
      updateClientRequestDto,
    );
  }

  removeClient(
    findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto,
  ) {
    return this.clientService.remove(findOneClientByIdRequestDto);
  }

  async registerClient(
    createClientRequestDto: Client.CreateClientRequestDto,
  ): Promise<Client.RegisterClientResponseDto> {
    return await this.clientService.register(createClientRequestDto);
  }
  async loginClient(
    loginClientRequestDto: Client.LoginClientRequestDto,
  ): Promise<Client.LoginClientResponceDto> {
    return await this.clientService.login(loginClientRequestDto);
  }
  async validateClient(
    validateClientRequestDto: Client.ValidateClientRequestDto,
  ): Promise<Client.ValidateClientResponseDto> {
    return await this.clientService.validate(validateClientRequestDto);
  }
  async refreshTokenClient(
    RefreshTokenClientRequestDto: Client.RefreshTokenClientRequestDto,
  ): Promise<Client.LoginClientResponceDto> {
    return await this.clientService.refreshToken(RefreshTokenClientRequestDto);
  }
}
