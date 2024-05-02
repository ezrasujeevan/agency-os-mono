import { Controller } from '@nestjs/common';
import { ClientService } from './client.service';

import { Client } from '@agency-os/class';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @MessagePattern(Client.Message.create)
  async createClient(
    @Payload() createClientRequestDto: Client.CreateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await this.clientService.create(createClientRequestDto);
  }

  @MessagePattern(Client.Message.findAll)
  async findAllClient(): Promise<Client.ClientResponseDto> {
    return await this.clientService.findAllClient();
  }

  @MessagePattern(Client.Message.findAllOfCompany)
  async findAllClientByCompany(
    @Payload() findAllOfCompanyRequestDto: Client.findAllOfCompanyRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await this.clientService.findAllClientByCompany(
      findAllOfCompanyRequestDto,
    );
  }

  @MessagePattern(Client.Message.findOneById)
  async findOneClientById(
    @Payload() findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await this.clientService.findOneClientById(
      findOneClientByIdRequestDto,
    );
  }

  @MessagePattern(Client.Message.findOneByEmail)
  async findOneClientByEmail(
    @Payload()
    findOneClientByEmailRequestDto: Client.FindOneClientByEmailRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await this.clientService.findOneClientByEmail(
      findOneClientByEmailRequestDto,
    );
  }

  @MessagePattern(Client.Message.create)
  async updateClient(
    @Payload() updateClientRequestDto: Client.UpdateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await this.clientService.updateClient(updateClientRequestDto);
  }

  @MessagePattern(Client.Message.delete)
  async removeClient(
    @Payload() findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await this.clientService.removeClient(findOneClientByIdRequestDto);
  }

  @MessagePattern(Client.Message.register)
  async registerClient(
    @Payload() createClientRequestDto: Client.CreateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await this.clientService.registerClient(createClientRequestDto);
  }

  @MessagePattern(Client.Message.login)
  async loginClient(
    @Payload() loginClientRequestDto: Client.LoginClientRequestDto,
  ): Promise<Client.LoginClientResponseDto> {
    return await this.clientService.loginClient(loginClientRequestDto);
  }

  @MessagePattern(Client.Message.validate)
  async validateClient(
    @Payload() validateClientRequestDto: Client.ValidateClientRequestDto,
  ): Promise<Client.ValidateClientResponseDto> {
    return await this.clientService.validateClient(validateClientRequestDto);
  }

  @MessagePattern(Client.Message.refresh)
  async refreshTokenClient(
    @Payload()
    refreshTokenClientRequestDto: Client.RefreshTokenClientRequestDto,
  ): Promise<Client.LoginClientResponseDto> {
    return await this.clientService.refreshClient(refreshTokenClientRequestDto);
  }
}
