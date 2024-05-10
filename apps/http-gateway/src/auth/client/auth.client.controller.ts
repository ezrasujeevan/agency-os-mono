import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthClientService } from './auth.client.service';
import { ApiTags } from '@nestjs/swagger';
import { Client } from '@agency-os/class';

@ApiTags('auth', 'client', 'auth/client', 'tcp/auth', 'tcp/auth/client')
@Controller('auth/client')
export class AuthClientController {
  constructor(private readonly authClientService: AuthClientService) {}

  @Post('login')
  async login(
    @Body() login: Client.LoginClientRequestDto,
  ): Promise<Client.LoginClientResponseDto> {
    return await this.authClientService.loginClient(login);
  }

  @Post('register')
  async register(
    @Body() create: Client.CreateClientRequestDto,
  ): Promise<Client.ClientResponseDto> {
    return await this.authClientService.registerClient(create);
  }

  @Post('validate')
  async validate(
    @Body() validate: Client.ValidateClientRequestDto,
  ): Promise<Client.ValidateClientResponseDto> {
    return await this.authClientService.validateClient(validate);
  }

  @Post('refresh')
  async refresh(
    @Body() refresh: Client.RefreshTokenClientRequestDto,
  ): Promise<Client.LoginClientResponseDto> {
    return await this.authClientService.refreshTokenClient(refresh);
  }
}
