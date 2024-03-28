import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInterface } from './auth.interface';

@Module({})
export class AuthModule {
  public static register(options: AuthInterface): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: options,
        },
      ],
      exports: [AuthService],
    };
  }

  public static registerAsync(options: AuthInterface): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: options,
        },
      ],
      exports: [AuthService],
    };
  }
}
