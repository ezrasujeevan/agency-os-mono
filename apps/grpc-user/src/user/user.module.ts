import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_JWT, Igrpc_jwt, validate_jwt } from './user.vaidation';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forFeature(validate_jwt),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => {
        3;
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
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
