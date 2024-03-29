import { Inject, Injectable, Module, OnModuleInit } from '@nestjs/common';
import { ClientProto } from '@agency-os/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { Client } from '@agency-os/common';

@Injectable()
export class ClientService implements OnModuleInit {
  private clientService: ClientProto.ClientServiceClient;
  constructor(
    @Inject(ClientProto.protobufPackage) private clientGrpc: ClientGrpc,
  ) {}

  onModuleInit() {
    this.clientService =
      this.clientGrpc.getService<ClientProto.ClientServiceClient>(
        ClientProto.CLIENT_SERVICE_NAME,
      );
  }

  create(CreateClientRequestDto: Client.CreateClientRequestDto) {
    return this.clientService.createClient(CreateClientRequestDto);
  }

  findAll() {
    return this.clientService.findAllClient({});
  }

  findOneById(findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto) {
    return this.clientService.findOneClientbyId(findOneClientByIdRequestDto);
  }

  findOneByEmail(
    findOneClientByEmailRequestDto: Client.FindOneClientByEmailRequestDto,
  ) {
    return this.clientService.findOneClientByEmail(
      findOneClientByEmailRequestDto,
    );
  }

  async update(
    id: string,
    updateClientRequestDto: Client.UpdateClientRequestDto,
  ) {
    const client = this.findOneById({ id });
    if (client && client !== undefined) {
      updateClientRequestDto = { ...updateClientRequestDto, id };
      return this.clientService.updateClient(updateClientRequestDto);
    }
  }

  async remove(
    findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto,
  ) {
    return this.clientService.removeClient(findOneClientByIdRequestDto);
  }
}
