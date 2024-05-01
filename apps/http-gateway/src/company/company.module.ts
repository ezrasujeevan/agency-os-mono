import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TcpModule } from '@agency-os/tcp-service';
import { Company } from '@agency-os/class';

@Module({
  imports: [TcpModule.register({ name: Company.SERVICE_NAME })],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
