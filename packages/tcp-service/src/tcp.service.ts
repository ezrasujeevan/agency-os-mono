import { Injectable } from '@nestjs/common';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TcpService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(name: string): TcpOptions {
    const host = this.configService.get<string>(`TCP_${name}_HOST`);
    const port = this.configService.get<number>(`TCP_${name}_PORT`);
    return {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    };
  }
}
