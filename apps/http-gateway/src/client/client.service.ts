import { Client } from '@agency-os/class';
import { Inject, Injectable } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClientService {
  constructor(
    @Inject(Client.SERVICE_NAME) private readonly clientService: ClientTCP,
  ) {}
  async createClient(
    create: Client.CreateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await firstValueFrom(
      this.clientService.send<
        Client.ClientResponseDto,
        Client.CreateClientRequestDto
      >(Client.Message.create, create),
    );
  }

  async findAllClient(): Promise<Client.ClientResponseDto> {
    return await firstValueFrom(
      this.clientService.send<Client.ClientResponseDto, object>(
        Client.Message.findAll,
        {},
      ),
    );
  }

  async findAllClientByCompany(company: Client.findAllOfCompanyRequestDto) {
    return await firstValueFrom(
      this.clientService.send<
        Client.ClientResponseDto,
        Client.findAllOfCompanyRequestDto
      >(Client.Message.findAllOfCompany, company),
    );
  }

  async findOneClientById(
    id: Client.FindOneClientByIdRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await firstValueFrom(
      this.clientService.send<
        Client.ClientResponseDto,
        Client.FindOneClientByIdRequestDto
      >(Client.Message.findOneById, id),
    );
  }

  async findOneClientByEmail(
    email: Client.FindOneClientByEmailRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await firstValueFrom(
      this.clientService.send<
        Client.ClientResponseDto,
        Client.FindOneClientByEmailRequestDto
      >(Client.Message.findOneByEmail, email),
    );
  }

  async updateClient(
    update: Client.UpdateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await firstValueFrom(
      this.clientService.send<
        Client.ClientResponseDto,
        Client.UpdateClientRequestDto
      >(Client.Message.update, update),
    );
  }

  async removeClient(
    id: Client.FindOneClientByIdRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await firstValueFrom(
      this.clientService.send<
        Client.ClientResponseDto,
        Client.FindOneClientByIdRequestDto
      >(Client.Message.delete, id),
    );
  }
}
