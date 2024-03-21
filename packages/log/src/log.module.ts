import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import{ConfigModule} from '@nestjs/config'
import { Log } from './log';
import { LoggerMiddleware } from './log.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [Log],
  exports: [Log],
})
export class LogModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
