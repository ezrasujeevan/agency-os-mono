import { Injectable, Logger } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class GrpcService {
  private readonly logger = new Logger(GrpcService.name);
  constructor(private readonly configService: ConfigService) {}
  getOptions(name: string): GrpcOptions {
    const url = this.configService.get(`GRPC_${name.toUpperCase()}_URL`);

    const protoPath = join(
      require.resolve('@agency-os/proto'),
      '../',
      `${name}.proto`,
    );

    this.logger.log(`GRPC Service ${name} is running on ${url}`);
    return {
      transport: Transport.GRPC,
      options: {
        protoPath,
        package: `${name}`,
        url,
      },
    };
  }
}
