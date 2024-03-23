import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { Repository } from 'typeorm';
import { Client } from '@agency-os/common';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
  ) {}

  async create(CreateClientRequestDto: Client.CreateClientRequestDto) {
    const user = this.clientRepo.create(CreateClientRequestDto);
    return this.clientRepo.save(user);
  }

  async findAll() {
    const clients = this.clientRepo.find();
    return { clients };
  }

  async findOneByEmail(
    findOneClientByEmailRequestDto: Client.FindOneClientByEmailRequestDto,
  ) {
    const { email } = findOneClientByEmailRequestDto;
    const client = this.clientRepo.findOne({ where: { email } });
    if (client && client !== undefined) {
      return client;
    }
    throw new NotFoundException(`Client not found by email: ${email}`);
  }

  async findOneById(
    findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto,
  ) {
    const { id } = findOneClientByIdRequestDto;
    const client = this.clientRepo.findOne({ where: { id } });
    if (client && client !== undefined) {
      return client;
    }
    throw new NotFoundException(`Client not found by email: ${id}`);
  }

  async update(
    id: string,
    UpdateClientRequestDto: Client.UpdateClientRequestDto,
  ): Promise<Client.Client> {
    const client = await this.findOneById({ id });
    if (client && client !== undefined) {
      return await this.clientRepo.save(client, {
        data: UpdateClientRequestDto,
      });
    }
    throw new NotFoundException(`Client not found by email: ${id}`);
  }

  async remove(
    findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto,
  ) {
    const client = await this.findOneById(findOneClientByIdRequestDto);
    if (client && client !== undefined) {
      return await this.clientRepo.remove(client);
    }
    throw new NotFoundException(
      `user not found by id ${findOneClientByIdRequestDto.id}`,
    );
  }
}
