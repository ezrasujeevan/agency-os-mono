import { Module } from '@nestjs/common';
import { AuthUserModule } from './user/auth.user.module';
import { AuthClientModule } from './client/auth.client.module';

@Module({
  imports: [AuthUserModule, AuthClientModule],
})
export class AuthModule {}
