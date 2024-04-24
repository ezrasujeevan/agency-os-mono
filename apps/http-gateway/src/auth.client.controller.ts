import { Body, Controller, Post } from '@nestjs/common';
import { Client } from '@agency-os/class';
import { AuthService } from '@agency-os/auth';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth', 'client', 'auth/client')
@Controller('auth/client')
export class AuthClientController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginClientRequestDto: Client.LoginClientRequestDto) {
    return await this.authService.loginClient(loginClientRequestDto);
  }
  @Post('register')
  async register(
    @Body() createClientRequestDto: Client.CreateClientRequestDto,
  ) {
    return await this.authService.registerClient(createClientRequestDto);
  }
  @Post('validate')
  async validate(
    @Body() validateClientRequestDto: Client.ValidateClientRequestDto,
  ) {
    return await this.authService.validateClient(validateClientRequestDto);
  }
  @Post('refresh')
  async refresh(
    @Body() refreshTokenClientRequestDto: Client.RefreshTokenClientRequestDto,
  ) {
    return await this.authService.refeshTokenClient(
      refreshTokenClientRequestDto,
    );
  }
}
