import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

interface RmqModuleOptions {
  name: string;
  noAck?: boolean;
  durable?: boolean;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({
    name,
    noAck = false,
    durable = true,
  }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      exports: [ClientsModule],
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              const urls = configService
                .get<string>(`RMQ_${name}_URL`)!
                .split(',');
              const queue = configService.get<string>(`RMQ_${name}_QUEUE`);
              return {
                transport: Transport.RMQ,
                options: {
                  urls,
                  queue,
                  queueOptions: {
                    durable,
                  },
                  noAck,
                },
              };
            },
          },
        ]),
      ],
    };
  }
}
