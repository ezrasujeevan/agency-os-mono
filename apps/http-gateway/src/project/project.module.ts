import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TcpModule } from '@agency-os/tcp-service';
import { TCP } from 'src/constants';

@Module({
  imports: [TcpModule.register({ name: TCP.PROJECT_SERVICE })],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
