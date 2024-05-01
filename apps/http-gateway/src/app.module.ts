import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ClientModule as ClientGrpcModule } from './grpc-client/client.module';
import { AuthModule } from '@agency-os/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_APP, Ihttp_app, validate_app } from './app.validation';
import { validate_user } from './grpc.users.validations';
import { validate_client } from './grpc.client.validations';
import { AuthClientController } from './auth.client.controller';
import { AuthUserController } from './auth.user.controller';
import { ProjectModule } from './project/project.module';
import { UserModule as UserGrpcModule } from './grpc-user/user.module';
import { AssetModule } from './asset/asset.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ClientModule } from './client/client.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forFeature(validate_app),
    ConfigModule.forFeature(validate_user),
    ConfigModule.forFeature(validate_client),
    UserGrpcModule,
    ClientGrpcModule,
    AuthModule.register({ user: 'user', client: 'client' }),
    UserModule,
    ClientModule,
    ProjectModule,
    AssetModule,
    DeliveryModule,
    CompanyModule,
  ],
  controllers: [AppController, AuthClientController, AuthUserController],
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
