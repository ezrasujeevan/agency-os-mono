import { DynamicModule, Module } from '@nestjs/common';
import { GrpcService } from './grpc.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

interface GrpcModuleOptions {
  name: string;
}

@Module({
  providers: [GrpcService],
  exports: [GrpcService],
})
export class GrpcModule {
  static register({ name }: GrpcModuleOptions): DynamicModule {
    return {
      module: GrpcModule,
      exports: [ClientsModule],
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              const host = configService.get(`GRPC_${name.toUpperCase()}_HOST`);
              const port = configService.get(`GRPC_${name.toUpperCase()}_PORT`);
              const url = configService.get(`GRPC_${name.toUpperCase()}_URL`);

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
            },
          },
        ]),
      ],
    };
  }
}
