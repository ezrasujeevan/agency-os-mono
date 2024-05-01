import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate_app, Igrpc_app, CONFIG_APP } from './app.validation';
import { TcpModule } from '@agency-os/tcp-service';
import { DeliveryModule } from './delivery/delivery.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CONFIG_DB, Igrpc_db, validate_db } from './db.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forFeature(validate_app),
    ConfigModule.forFeature(validate_db),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const config: Igrpc_db = configService.get<Igrpc_db>(CONFIG_DB)!;
        const {
          host,
          name: database,
          password,
          port,
          schema,
          username,
        } = config.db;
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          schema,
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
        };
        return options;
      },
      inject: [ConfigService],
    }),
    TcpModule,
    DeliveryModule,
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
