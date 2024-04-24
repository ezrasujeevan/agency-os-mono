import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectService } from './project.service';
import { Project } from '@agency-os/class';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern(Project.Message.create)
  create(@Payload() createProjectRequestDto: Project.CreateProjectRequestDto) {
    return this.projectService.create(createProjectRequestDto);
  }

  @MessagePattern(Project.Message.findAll)
  findAll() {
    return this.projectService.findAll();
  }
  @MessagePattern(Project.Message.findAllByClient)
  findAllByClient(
    @Payload()
    findAllProjectByClientRequestDto: Project.FindAllProjectByClientRequestDto,
  ) {
    return this.projectService.findAllByClient(
      findAllProjectByClientRequestDto,
    );
  }
  @MessagePattern(Project.Message.findAllByCompany)
  findAllByCompany(
    @Payload()
    findAllProjectByCompanyRequestDto: Project.FindAllProjectByCompanyRequestDto,
  ) {
    return this.projectService.findAllByCompany(
      findAllProjectByCompanyRequestDto,
    );
  }

  @MessagePattern(Project.Message.findAllByUser)
  findAllByUser(
    @Payload()
    findAllProjectByUserRequestDto: Project.FindAllProjectByUserRequestDto,
  ) {
    return this.projectService.findAllByUser(findAllProjectByUserRequestDto);
  }

  @MessagePattern(Project.Message.findOneById)
  findOneById(
    @Payload()
    findOneProjectRequestByIdDto: Project.FindOneProjectRequestByIdDto,
  ) {
    return this.projectService.findOneById(findOneProjectRequestByIdDto);
  }
  @MessagePattern(Project.Message.findOneByTrialName)
  findOneByTrialName(
    @Payload()
    findOneProjectRequestByTrialNameDto: Project.FindOneProjectRequestByTrialNameDto,
  ) {
    return this.projectService.findOneByTrialName(
      findOneProjectRequestByTrialNameDto,
    );
  }

  @MessagePattern(Project.Message.update)
  update(@Payload() updateProjectRequestDto: Project.UpdateProjectRequestDto) {
    return this.projectService.update(
      updateProjectRequestDto.id,
      updateProjectRequestDto,
    );
  }

  @MessagePattern(Project.Message.remove)
  remove(
    @Payload()
    FindOneProjectRequestByIdDto: Project.FindOneProjectRequestByIdDto,
  ) {
    return this.projectService.remove(FindOneProjectRequestByIdDto);
  }
}
