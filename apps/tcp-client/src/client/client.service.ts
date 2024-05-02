import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Client, Company } from '@agency-os/class';
import { JwtService } from '@nestjs/jwt';
import { ClientRepository } from './client.repository';
import { ClientTCP } from '@nestjs/microservices';
import { ClientEntity } from './client.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClientService {
  private readonly logger: Logger = new Logger(ClientService.name);
  constructor(
    @Inject(Company.SERVICE_NAME) private readonly companyService: ClientTCP,
    private readonly clientRepo: ClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createClientRequestDto: Client.CreateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    if (!(await this.isValidCompany(createClientRequestDto.companyId))) {
      return {
        error: 'Company not found',
        status: HttpStatus.NOT_FOUND,
      };
    }
    const client = await this.clientRepo.createClient(createClientRequestDto);
    if (client instanceof ClientEntity) {
      return {
        client,
        status: HttpStatus.CREATED,
      };
    } else if (client instanceof Error) {
      return {
        error: client.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async findAllClient(): Promise<Client.ClientResponseDto> {
    const client = await this.clientRepo.findAllClient();
    if (
      Array.isArray(client) &&
      client.every((u) => u instanceof ClientEntity)
    ) {
      return { client, status: HttpStatus.OK };
    } else {
      return { error: 'Client not found', status: HttpStatus.NOT_FOUND };
    }
  }
  async findAllClientByCompany({
    companyId,
  }: Client.findAllOfCompanyRequestDto): Promise<Client.ClientResponseDto> {
    if (!(await this.isValidCompany(companyId))) {
      return {
        error: 'Company not found',
        status: HttpStatus.NOT_FOUND,
      };
    }
    const client = await this.clientRepo.findAllClientByCompany({ companyId });
    if (
      Array.isArray(client) &&
      client.every((u) => u instanceof ClientEntity)
    ) {
      return { client, status: HttpStatus.OK };
    } else {
      return { error: 'Client not found', status: HttpStatus.NOT_FOUND };
    }
  }

  async findOneClientById(
    findOneClientByIdRequestDto: Client.FindOneClientByIdRequestDto,
  ): Promise<Client.ClientResponseDto> {
    const client = await this.clientRepo.findOneClientById(
      findOneClientByIdRequestDto,
    );
    if (client instanceof ClientEntity) {
      return { client, status: HttpStatus.OK };
    } else {
      return { error: 'Client not found', status: HttpStatus.NOT_FOUND };
    }
  }

  async findOneClientByEmail(
    findOneClientByEmailRequestDto: Client.FindOneClientByEmailRequestDto,
  ): Promise<Client.ClientResponseDto> {
    const client = await this.clientRepo.findOneClientByEmail(
      findOneClientByEmailRequestDto,
    );
    if (client instanceof ClientEntity) {
      return { client, status: HttpStatus.OK };
    } else if (client === null) {
      return { error: 'Client not found', status: HttpStatus.NOT_FOUND };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async updateClient(
    updateClientRequestDto: Client.UpdateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    const { companyId } = updateClientRequestDto;
    if (companyId) {
      if (!(await this.isValidCompany(companyId))) {
        return {
          error: 'Company not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
    }
    const client = this.clientRepo.updateClient(updateClientRequestDto);
    if (client instanceof ClientEntity) {
      return {
        client,
        status: HttpStatus.OK,
      };
    } else if (client instanceof Error) {
      return {
        error: client.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async removeClient(
    findOneClientDto: Client.FindOneClientByIdRequestDto,
  ): Promise<Client.ClientResponseDto> {
    const client = this.clientRepo.removeClient(findOneClientDto);
    if (client instanceof ClientEntity) {
      return {
        status: HttpStatus.NO_CONTENT,
      };
    } else if (client instanceof Error) {
      return {
        error: client.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async registerClient(
    createClientRequestDto: Client.CreateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    const { email, companyId } = createClientRequestDto;
    const client = await this.clientRepo.findOneClientByEmail({ email });
    if (client) {
      return {
        error: ['client already exists'],
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      if (!(await this.isValidCompany(companyId))) {
        return {
          error: 'Company not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      const newClient = await this.clientRepo.createClient(
        createClientRequestDto,
      );

      if (newClient instanceof ClientEntity) {
        return { status: HttpStatus.CREATED };
      } else {
        return {
          error: newClient.message,
          status: HttpStatus.BAD_REQUEST,
        };
      }
    }
  }

  async loginClient(
    loginClientRequestDto: Client.LoginClientRequestDto,
  ): Promise<Client.LoginClientResponseDto> {
    const client = await this.clientRepo.loginClient(loginClientRequestDto);
    if (client instanceof ClientEntity) {
      const { id, email } = client;
      const token = await this.jwtService.signAsync({ id, email });
      const refreshToken = await this.jwtService.signAsync(
        { id, email },
        { expiresIn: '7d' },
      );
      return {
        token,
        status: HttpStatus.OK,
        clientId: client.id,
        refreshToken,
      };
    } else if (client instanceof Error) {
      return {
        error: client.message,
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async validateClient({
    token,
  }: Client.ValidateClientRequestDto): Promise<Client.ValidateClientResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const client = await this.clientRepo.findOneClientById({
        id: payload['id'],
      });
      if (payload && client) {
        return {
          status: HttpStatus.OK,
          clientId: client.id,
        };
      }
    } catch (error) {
      return { error: error, status: HttpStatus.UNAUTHORIZED };
    }
    return {
      error: ['invalid token'],
      status: HttpStatus.UNAUTHORIZED,
    };
  }

  async refreshClient(
    refreshTokenClientRequestDto: Client.RefreshTokenClientRequestDto,
  ): Promise<Client.LoginClientResponseDto> {
    try {
      const { refreshToken } = refreshTokenClientRequestDto;

      const payload = await this.jwtService.verifyAsync(refreshToken);
      const client = await this.clientRepo.findOneClientById({
        id: payload['id'],
      });
      if (payload && client) {
        const { id, email } = client;
        const token = await this.jwtService.signAsync({ id, email });
        const refreshToken = await this.jwtService.signAsync(
          { id, email },
          { expiresIn: '7d' },
        );
        return {
          status: HttpStatus.OK,
          clientId: client.id,
          refreshToken,
          token,
        };
      }
    } catch (error) {
      return {
        error: error,
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    return {
      error: 'invalid token',
      status: HttpStatus.BAD_REQUEST,
    };
  }

  private async isValidCompany(id: string): Promise<boolean> {
    const companyResponse = await firstValueFrom(
      this.companyService.send<
        Company.companyResponseDto,
        Company.FindOneCompanyByIdRequestDto
      >(Company.Message.findOneById, { id }),
    );
    const { status, company } = companyResponse;
    if (status === HttpStatus.OK && company) {
      return true;
    }
    return false;
  }
}
