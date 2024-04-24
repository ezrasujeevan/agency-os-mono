import { Project } from '@agency-os/class';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TCP } from 'src/constants';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(TCP.PROJECT_SERVICE) private projectClient: ClientProxy,
  ) {}

  async createProject(
    createProjectRequestDto: Project.CreateProjectRequestDto,
  ): Promise<Project.ProjectResponse> {
    return await firstValueFrom(
      this.projectClient.send(Project.Message.create, createProjectRequestDto),
    );
  }

  async findOneProjectById(
    findOneProjectRequestByIdDto: Project.FindOneProjectRequestByIdDto,
  ): Promise<Project.ProjectResponse> {
    return await firstValueFrom(
      this.projectClient.send(
        Project.Message.findOneById,
        findOneProjectRequestByIdDto,
      ),
    );
  }

  async findOneProjectByTrialName(
    findOneProjectRequestByTrialNameDto: Project.FindOneProjectRequestByTrialNameDto,
  ): Promise<Project.ProjectResponse> {
    return await firstValueFrom(
      this.projectClient.send(
        Project.Message.findOneByTrialName,
        findOneProjectRequestByTrialNameDto,
      ),
    );
  }

  async findAllProject(): Promise<Project.ProjectResponse> {
    return await firstValueFrom(
      this.projectClient.send(Project.Message.findAll, {}),
    );
  }

  async findAllProjectByCompany(
    findAllProjectByCompanyRequestDto: Project.FindAllProjectByCompanyRequestDto,
  ): Promise<Project.ProjectResponse> {
    return await firstValueFrom(
      this.projectClient.send(
        Project.Message.findAllByCompany,
        findAllProjectByCompanyRequestDto,
      ),
    );
  }

  async findAllProjectByUser(
    findAllProjectByUserRequestDto: Project.FindAllProjectByUserRequestDto,
  ): Promise<Project.ProjectResponse> {
    return await firstValueFrom(
      this.projectClient.send(
        Project.Message.findAllByUser,
        findAllProjectByUserRequestDto,
      ),
    );
  }

  async findAllProjectByClient(
    findAllProjectByClientRequestDto: Project.FindAllProjectByClientRequestDto,
  ): Promise<Project.ProjectResponse> {
    return await firstValueFrom(
      this.projectClient.send(
        Project.Message.findAllByClient,
        findAllProjectByClientRequestDto,
      ),
    );
  }

  async updateProject(
    id: string,
    updateProjectRequestDto: Project.UpdateProjectRequestDto,
  ): Promise<Project.ProjectResponse> {
    updateProjectRequestDto.id = id;
    return await firstValueFrom(
      this.projectClient.send(Project.Message.update, updateProjectRequestDto),
    );
  }

  async removeProject(
    findOneProjectRequestByIdDto: Project.FindOneProjectRequestByIdDto,
  ): Promise<Project.ProjectResponse> {
    return await firstValueFrom(
      this.projectClient.send(
        Project.Message.remove,
        findOneProjectRequestByIdDto,
      ),
    );
  }
}
