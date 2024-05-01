import { Injectable, Logger } from '@nestjs/common';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TcpService {
  private logger: Logger = new Logger(TcpService.name);
  constructor(private readonly configService: ConfigService) {}

  getOptions(name: string): TcpOptions {
    const host = this.configService.get<string>(
      `TCP_${name.toUpperCase()}_HOST`,
    );
    const port = this.configService.get<number>(
      `TCP_${name.toUpperCase()}_PORT`,
    );
    this.logger.log(`Tcp Service ${name} is running on ${host}:${port}`);
    return {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    };
  }
}
