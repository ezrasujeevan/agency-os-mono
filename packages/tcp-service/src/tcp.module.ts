import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TcpService } from './tcp.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

interface TcpModuleOptions {
  name: string;
}

@Module({
  providers: [TcpService],
  exports: [TcpService],
})
export class TcpModule {
  private static readonly logger = new Logger(TcpModule.name);
  static register({ name }: TcpModuleOptions): DynamicModule {
    this.logger.log(`Registering TCP Module for ${name}`);
    return {
      module: TcpModule,
      exports: [ClientsModule],
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              const host = configService.get<string>(`TCP_${name}_HOST`);
              const port = configService.get<number>(`TCP_${name}_PORT`);
              this.logger.log(`Creating TCP Client for ${name}`);
              this.logger.log(`Host: ${host}`);
              this.logger.log(`Port: ${port}`);
              return {
                transport: Transport.TCP,
                options: {
                  host,
                  port,
                },
              };
            },
          },
        ]),
      ],
    };
  }
}
