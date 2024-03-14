import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@agency-os/config';

import { Log } from './log';
import { LoggerMiddleware } from './log.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [Log],
  exports: [Log],
})
export class LogModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
