import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'This is From AUth!';
  }
}
