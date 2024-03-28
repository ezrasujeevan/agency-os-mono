import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from '@agency-os/auth';

@Module({
  imports: [UsersModule, AuthModule.register({}), ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
