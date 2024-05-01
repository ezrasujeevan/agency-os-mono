import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleService {
  getHello(): string {
    return 'This is From AUth!';
  }

  private getAuthService() {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile:''
      });
    } catch (error: Error | any) {}
  }
}
