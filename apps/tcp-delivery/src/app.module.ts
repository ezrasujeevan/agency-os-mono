import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate_app, Igrpc_app, CONFIG_APP } from './app.validation';
import { TcpModule } from '@agency-os/tcp-service';
import { ProjectModule } from './delivery/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forFeature(validate_app),
    TcpModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  private logger: Logger;
  @Inject() private configService: ConfigService;

  constructor() {
    this.logger = new Logger(AppModule.name);
  }

  onModuleInit() {
    const config: Igrpc_app = this.configService.get<Igrpc_app>(CONFIG_APP)!;
    this.logger.log(
      `Apllication Started at ${config.app.host}:${config.app.port} `,
    );
    this.logger.warn(`This Application is in ${config.env}`);
  }
}
