import { Controller } from '@nestjs/common';
import { ClientService } from './client.service';

import { Client } from '@agency-os/common';
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

  async registerClient(createClientRequestDto: Client.CreateClientRequestDto) {}
  async loginClient(createClientRequestDto: Client.CreateClientRequestDto) {}
  async validateClient(createClientRequestDto: Client.CreateClientRequestDto) {}
}
