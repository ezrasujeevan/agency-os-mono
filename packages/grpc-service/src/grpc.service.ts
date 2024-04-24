import { Injectable } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class GrpcService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(name: string): GrpcOptions {
    const host = this.configService.get(`GRPC_${name.toUpperCase()}_HOST`);
    const port = this.configService.get(`GRPC_${name.toUpperCase()}_PORT`);
    const url = this.configService.get(`GRPC_${name.toUpperCase()}_URL`);

    const protoPath = join(
      require.resolve('@agency-os/proto'),
      '../',
      `${name}.proto`,
    );
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
