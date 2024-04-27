import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectRepository } from './project.repository';
import { GrpcModule } from '@agency-os/grpc-service';
import { Client, User } from '@agency-os/class';
import { ProjectHelperService } from './project.helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    GrpcModule.register({ name: User.SERVICE_NAME }),
    GrpcModule.register({ name: Client.SERVICE_NAME }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, ProjectHelperService],
})
export class ProjectModule {}
