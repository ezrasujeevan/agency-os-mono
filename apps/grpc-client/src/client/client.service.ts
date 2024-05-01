import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { Repository } from 'typeorm';
import { Client } from '@agency-os/class';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    CreateClientRequestDto: Client.CreateClientRequestDto,
  ): Promise<Client.Client> {
    const { password, ...rest } = CreateClientRequestDto;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const client = this.clientRepo.create({
      password: encryptedPassword,
      ...rest,
    });
    return this.clientRepo.save(client);
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

  async register(
    createClientRequestDto: Client.CreateClientRequestDto,
  ): Promise<Client.RegisterClientResponseDto> {
    const { email } = createClientRequestDto;
    const client = await this.findOneByEmail({ email });
    if (client && client !== undefined) {
      return {
        error: ['user already exists'],
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      await this.create(createClientRequestDto);
      return { error: [], status: HttpStatus.CREATED };
    }
  }

  async login(
    loginClientRequestDto: Client.LoginClientRequestDto,
  ): Promise<Client.LoginClientResponceDto> {
    const { email, password } = loginClientRequestDto;
    const user = await this.clientRepo.findOne({
      where: { email },
      select: ['password', 'id'],
    });
    if (user && user !== undefined) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = await this.jwtService.signAsync({ id: user.id, email });
        const refreshToken = await this.jwtService.signAsync(
          { id: user.id, email },
          { expiresIn: '7d' },
        );
        return {
          token,
          error: [],
          status: HttpStatus.OK,
          clientId: user.id,
          refreshToken,
        };
      }
    }
    return {
      token: '',
      error: ['invalid email or password'],
      status: HttpStatus.UNAUTHORIZED,
      clientId: '',
      refreshToken: '',
    };
  }

  async validate(
    validateClientRequestDto: Client.ValidateClientRequestDto,
  ): Promise<Client.ValidateClientResponseDto> {
    try {
      const { token } = validateClientRequestDto;

      const payload = await this.jwtService.verifyAsync(token);
      const client = await this.findOneById({ id: payload['id'] });
      if (payload && payload !== undefined && client && client !== undefined) {
        return {
          error: [],
          status: HttpStatus.OK,
          clientId: client.id,
          compnayId: '', // Add the missing property 'compnayId'
        };
      }
    } catch (error) {
      return {
        error: error,
        status: HttpStatus.UNAUTHORIZED,
        clientId: '',
        compnayId: '',
      };
    }
    return {
      error: ['invalid token'],
      status: HttpStatus.UNAUTHORIZED,
      clientId: '',
      compnayId: '',
    };
  }

  async refreshToken(
    RefreshTokenClientRequestDto: Client.RefreshTokenClientRequestDto,
  ): Promise<Client.LoginClientResponceDto> {
    try {
      const { refreshToken } = RefreshTokenClientRequestDto;

      const payload = await this.jwtService.verifyAsync(refreshToken);
      const client = await this.findOneById({ id: payload['id'] });
      if (payload && payload !== undefined && client && client !== undefined) {
        const token = await this.jwtService.signAsync({
          id: client.id,
          email: client.email,
        });
        const refreshToken = await this.jwtService.signAsync(
          {
            id: client.id,
            email: client.email,
          },
          { expiresIn: '7d' },
        );
        return {
          error: [],
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
        clientId: '',
        refreshToken: '',
        token: '',
      };
    }
    return {
      error: ['invalid token'],
      status: HttpStatus.BAD_REQUEST,
      clientId: '',
      refreshToken: '',
      token: '',
    };
  }
}
