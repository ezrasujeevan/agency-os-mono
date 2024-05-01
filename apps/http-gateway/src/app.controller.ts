import { Controller, Get } from '@nestjs/common';
import { AuthService } from '@agency-os/auth';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
