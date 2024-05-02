import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectRepository } from './project.repository';
import { Client, User, Company } from '@agency-os/class';
import { ProjectHelperService } from './project.helper.service';
import { TcpModule } from '@agency-os/tcp-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    TcpModule.register({ name: User.SERVICE_NAME }),
    TcpModule.register({ name: Client.SERVICE_NAME }),
    TcpModule.register({ name: Company.SERVICE_NAME }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, ProjectHelperService],
})
export class ProjectModule {}
