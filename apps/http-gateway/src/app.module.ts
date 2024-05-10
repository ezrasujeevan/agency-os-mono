import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_APP, Ihttp_app, validate_app } from './app.validation';
import { ProjectModule } from './project/project.module';
import { AssetModule } from './asset/asset.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ClientModule } from './client/client.module';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forFeature(validate_app),
    UserModule,
    ClientModule,
    ProjectModule,
    AssetModule,
    DeliveryModule,
    CompanyModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  private logger: Logger;
  @Inject() private configService: ConfigService;
  constructor() {
    this.logger = new Logger(AppModule.name);
  }
  onModuleInit() {
    const config: Ihttp_app = this.configService.get<Ihttp_app>(CONFIG_APP)!;
    this.logger.log(`Apllication Started on Port ${config.app.port} `);
    this.logger.warn(`This Application is in ${config.env}`);
  }
}
