import { Client } from '@agency-os/class';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class ClientRepository {
  private readonly logger: Logger = new Logger(ClientRepository.name);
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
  ) {}

  async createClient(
    createClientRequestDto: Client.CreateClientRequestDto,
  ): Promise<ClientEntity | Error> {
    try {
      const { password, ...rest } = createClientRequestDto;
      const encryptedPassword = await bcrypt.hash(password, 10);
      const client = this.clientRepo.create({
        password: encryptedPassword,
        ...rest,
      });
      this.logger.verbose(`createClient: ${JSON.stringify(client)}`);
      return await this.clientRepo.save(client);
    } catch (error: Error | any) {
      this.logger.error(`createClient: ${error.message}`);
      return error;
    }
  }

  async findAllClient(): Promise<ClientEntity[]> {
    const clients = await this.clientRepo.find({});
    this.logger.verbose(`findAll: ${JSON.stringify(clients)}`);
    return clients;
  }

  async findAllClientByCompany({
    companyId,
  }: Client.findAllOfCompanyRequestDto): Promise<ClientEntity[]> {
    const clients = await this.clientRepo.find({ where: { companyId } });
    this.logger.verbose(`findAll: ${JSON.stringify(clients)}`);
    return clients;
  }

  async findOneClientById({
    id,
  }: Client.FindOneClientByIdRequestDto): Promise<ClientEntity | null> {
    const client = await this.clientRepo.findOne({ where: { id } });
    this.logger.verbose(`findOneById: ${JSON.stringify(client)}`);
    return client;
  }

  async findOneClientByEmail({
    email,
  }: Client.FindOneClientByEmailRequestDto): Promise<ClientEntity | null> {
    const client = await this.clientRepo.findOne({ where: { email } });
    this.logger.verbose(`findOneByEmail: ${JSON.stringify(client)}`);
    return client;
  }

  async updateClient(
    updateClientDto: Client.UpdateClientRequestDto,
  ): Promise<ClientEntity | Error> {
    try {
      const client = await this.findOneClientById({ id: updateClientDto.id });
      if (client) {
        this.logger.verbose(`Client found ${JSON.stringify(client)}`);
        const updatedClient = await this.clientRepo.merge(
          client,
          updateClientDto,
        );
        this.logger.verbose(`Client updated ${JSON.stringify(updatedClient)}`);
        return await this.clientRepo.save(updatedClient);
      }
      throw new NotFoundException(
        `Client not found by id ${updateClientDto.id}`,
      );
    } catch (error: Error | any) {
      this.logger.error(`update: ${error.message}`);
      return error;
    }
  }

  async removeClient(
    findOneClientDto: Client.FindOneClientByIdRequestDto,
  ): Promise<ClientEntity | Error> {
    try {
      const client = await this.clientRepo.findOne({
        where: { id: findOneClientDto.id },
      });
      if (client) {
        this.logger.verbose(`Client found ${JSON.stringify(client)}`);
        return await this.clientRepo.softRemove(client);
      }
      throw new NotFoundException(
        `client not found by id ${findOneClientDto.id}`,
      );
    } catch (error: Error | any) {
      this.logger.error(`remove: ${error.message}`);
      return error;
    }
  }
  //_------------------------------------------------------------------------------------------------------------

  async loginClient(
    LoginClientRequestDto: Client.LoginClientRequestDto,
  ): Promise<ClientEntity | Error> {
    const { email, password } = LoginClientRequestDto;
    const client = await this.clientRepo.findOne({
      where: { email },
      select: ['password', 'id', 'email'],
    });
    if (client && client !== undefined) {
      const passwordMatch = await bcrypt.compare(password, client.password);
      if (passwordMatch) {
        return client;
      }
    }
    return new Error('invalid email or password');
  }
}
