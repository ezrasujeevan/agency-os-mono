import { Injectable } from '@nestjs/common';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TcpService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(name: string): TcpOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.configService.get<string>(`TCP_${name}_HOST`),
        port: this.configService.get<number>(`TCP_${name}_PORT`),
      },
    };
  }
}
