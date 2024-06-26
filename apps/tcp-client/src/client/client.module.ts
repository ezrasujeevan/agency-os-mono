import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { CONFIG_JWT, Igrpc_jwt, validate_jwt } from './client.vaidation';
import { ClientRepository } from './client.repository';
import { Company } from '@agency-os/class';
import { TcpModule } from '@agency-os/tcp-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    ConfigModule.forFeature(validate_jwt),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => {
        const config: Igrpc_jwt = configService.get<Igrpc_jwt>(CONFIG_JWT)!;
        const options: JwtModuleOptions = {
          secret: config.jwt.secret,
          global: true,
          signOptions: {
            expiresIn: config.jwt.expiresIn,
            issuer: config.jwt.issuer,
          },
        };
        return options;
      },
    }),
    TcpModule.register({ name: Company.SERVICE_NAME }),
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
})
export class ClientModule {}
