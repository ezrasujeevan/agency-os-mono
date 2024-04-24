import { Injectable } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(name: string): RmqOptions {
    const url = this.configService.get<string>(`RMQ_${name}_URL`);
    const urls = url.split(',');
    const queue = this.configService.get<string>(`RMQ_${name}_QUEUE`);
    return {
      transport: Transport.RMQ,
      options: {
        urls,
        queue,
      },
    };
  }
}
