import { Injectable } from '@nestjs/common';
import { TcpClientOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TcpService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(name: string): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.configService.get<string>(`TCP_${name}_HOST`),
        port: this.configService.get<number>(`TCP_${name}_PORT`),
      },
    };
  }
}
