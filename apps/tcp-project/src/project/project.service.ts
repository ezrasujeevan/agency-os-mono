import { HttpStatus, Injectable } from '@nestjs/common';
import { ProjectEntity } from './project.entity';
import { ProjectRepository } from './project.repository';
import { ProjectHelperService } from './project.helper.service';
import { Project } from '@agency-os/class';
import e from 'express';
@Injectable()
/**
 * Service class for managing projects.
 */
export class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
    private readonly projectHelperService: ProjectHelperService,
  ) {}

  async create(
    createProjectRequestDto: Project.CreateProjectRequestDto,
  ): Promise<Project.ProjectResponse> {
    const { userId, clientId, companyId, trialName } = createProjectRequestDto;
    const project = await this.projectRepo.findOneByTrialName({ trialName });
    if (project) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Project - Trail Name already exists',
      };
    } else if (
      (await this.projectHelperService.isValidClient(clientId)) &&
      (await this.projectHelperService.isValidUser(userId)) &&
      (await this.projectHelperService.isValidCompany(companyId))
    ) {
      const newProject = await this.projectRepo.create(createProjectRequestDto);
      if (newProject instanceof ProjectEntity) {
        return {
          project: newProject,
          status: HttpStatus.CREATED,
        };
      } else {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: newProject.name + '-' + newProject.message,
        };
      }
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid User, Client or Company',
      };
    }
  }

  async findOneById(
    FindOneProjectRequestByIdDto: Project.FindOneProjectRequestByIdDto,
  ): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.findOneById(
      FindOneProjectRequestByIdDto,
    );
    if (project) {
      return { project, status: HttpStatus.OK };
    } else {
      return {
        status: HttpStatus.NO_CONTENT,
      };
    }
  }

  async findOneByTrialName(
    findOneProjectRequestByTrialNameDto: Project.FindOneProjectRequestByTrialNameDto,
  ): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.findOneByTrialName(
      findOneProjectRequestByTrialNameDto,
    );
    if (project) {
      return { project, status: HttpStatus.OK };
    } else {
      return {
        status: HttpStatus.NO_CONTENT,
      };
    }
  }

  async findAll(): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.findAll();
    if (project) {
      return {
        project,
        status: HttpStatus.OK,
      };
    } else {
      return {
        status: HttpStatus.NO_CONTENT,
      };
    }
  }

  async findAllByCompany({
    companyId,
  }: Project.FindAllProjectByCompanyRequestDto): Promise<Project.ProjectResponse> {
    if (await this.projectHelperService.isValidCompany(companyId)) {
      const project = await this.projectRepo.findAllByCompany({ companyId });
      if (project) {
        return {
          project,
          status: HttpStatus.OK,
        };
      } else {
        return {
          status: HttpStatus.NO_CONTENT,
        };
      }
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'incorrect Company ID',
      };
    }
  }
  async findAllByUser({
    userId,
  }: Project.FindAllProjectByUserRequestDto): Promise<Project.ProjectResponse> {
    if (await this.projectHelperService.isValidClient(userId)) {
      const project = await this.projectRepo.findAllByUser({ userId });
      if (project) {
        return {
          project,
          status: HttpStatus.OK,
        };
      } else {
        return {
          status: HttpStatus.NO_CONTENT,
        };
      }
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'incorrect User ID',
      };
    }
  }

  async findAllByClient({
    clientId,
  }: Project.FindAllProjectByClientRequestDto): Promise<Project.ProjectResponse> {
    if (await this.projectHelperService.isValidClient(clientId)) {
      const project = await this.projectRepo.findAllByClient({ clientId });
      if (project) {
        return {
          project,
          status: HttpStatus.OK,
        };
      } else {
        return {
          status: HttpStatus.NO_CONTENT,
        };
      }
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'incorrect Client ID',
      };
    }
  }

  async update(
    updateProjectRequestDto: Project.UpdateProjectRequestDto,
  ): Promise<Project.ProjectResponse> {
    const { id, clientId, companyId, userId } = updateProjectRequestDto;
    const project = await this.projectRepo.findOneById({ id });
    if (project) {
      //todo
      if (
        clientId &&
        (await this.projectHelperService.isValidClient(clientId)) &&
        userId &&
        (await this.projectHelperService.isValidUser(userId)) &&
        companyId &&
        (await this.projectHelperService.isValidCompany(companyId))
      ) {
        const updatedProject = await this.projectRepo.update(
          id,
          updateProjectRequestDto,
        );

        if (updatedProject instanceof ProjectEntity) {
          return {
            project: updatedProject,
            status: HttpStatus.OK,
          };
        } else if (updatedProject instanceof Error) {
          return {
            status: HttpStatus.BAD_REQUEST,
            error: updatedProject.name + '-' + updatedProject.message,
          };
        }
      }
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: 'incorrect Project ID',
    };
  }

  async remove({
    id,
  }: Project.FindOneProjectRequestByIdDto): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.findOneById({ id });
    if (project) {
      await this.projectRepo.remove({ id });
      return {
        status: HttpStatus.NO_CONTENT,
      };
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: 'incorrect Project ID',
    };
  }
}
