import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProto } from '@agency-os/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { Client } from '@agency-os/class';
import { Metadata } from '@grpc/grpc-js';
import { GRPC } from 'src/constants';

@Injectable()
export class ClientService implements OnModuleInit {
  private clientService: ClientProto.ClientServiceClient;
  constructor(
    @Inject(ClientProto.CLIENT_PACKAGE_NAME) private clientGrpc: ClientGrpc,
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

  findAll({}, metadata?: Metadata) {
    return this.clientService.findAllClient({}, metadata);
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
