import { Controller, Get } from '@nestjs/common';
import { AuthClientService } from './auth.client.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth', 'client', 'auth/client', 'tcp/auth', 'tcp/auth/client')
@Controller('auth/client')
export class AuthClientController {
  constructor(private readonly authClientService: AuthClientService) {}

  @Get()
  async get() {
    return 'hello From Auth Client Controller';
  }
}
