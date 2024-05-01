import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TcpModule } from '@agency-os/tcp-service';
import { Project } from '@agency-os/class';
@Module({
  imports: [TcpModule.register({ name: Project.SERVICE_NAME })],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
