import {
  ConfigurableModuleBuilder,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppValidation, { Igrpc_user } from './app.validation';
import { log } from 'console';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forFeature(AppValidation),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const db = configService.get<Igrpc_user>('agency-os-config-grpc-user');
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          host: db?.db_host,
          port: db?.db_port,
          username: db?.db_username,
          password: db?.db_password,
          database: db?.db_name,
          schema: db?.db_schema,
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
        };
        return options;
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
