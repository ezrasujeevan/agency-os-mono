import { Controller, Get } from '@nestjs/common';
import { AuthService } from '@agency-os/auth';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
