import { DynamicModule, Logger, Module } from '@nestjs/common';
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
  private static logger: Logger = new Logger(GrpcModule.name);
  static register({ name }: GrpcModuleOptions): DynamicModule {
    this.logger.log(`Registering ${name} grpc module`);
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
              this.logger.log(
                `Registering ${name} grpc module with protoPath: ${protoPath}`,
              );
              this.logger.log(
                `Registering ${name} grpc module with url: ${url}`,
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
