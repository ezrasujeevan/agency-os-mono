import { DynamicModule, Module } from '@nestjs/common';
import { TcpService } from './rmq.service';
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
  static register({ name }: TcpModuleOptions): DynamicModule {
    return {
      module: TcpModule,
      providers: [
        {
          provide: 'TCP_MODULE_OPTIONS',
          useValue: { name },
        },
      ],
      exports: [ClientsModule],
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              return {
                transport: Transport.TCP,
                options: {
                  host: configService.get<string>(`TCP_${name}_HOST`),
                  port: configService.get<number>(`TCP_${name}_PORT`),
                },
              };
            },
          },
        ]),
      ],
    };
  }
}
