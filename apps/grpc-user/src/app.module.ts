import {
  ConfigurableModuleBuilder,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { validateEnv } from '@agency-os/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          username: configService.get<string>('DATABASE_USERNAME'),
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
