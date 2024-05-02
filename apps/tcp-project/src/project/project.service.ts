import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProjectEntity } from './project.entity';
import { ProjectRepository } from './project.repository';
import { Client, Company, Project, User } from '@agency-os/class';
import { firstValueFrom } from 'rxjs';
import { ClientTCP } from '@nestjs/microservices';

/**
 * Service class for managing projects.
 */
@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
    @Inject(User.SERVICE_NAME) private readonly userService: ClientTCP,
    @Inject(Client.SERVICE_NAME) private readonly clientService: ClientTCP,
    @Inject(Company.SERVICE_NAME) private readonly companyService: ClientTCP,
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
    } else {
      if (!(await this.isValidClient(clientId))) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect Client ID',
        };
      }
      if (!(await this.isValidUser(userId))) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect User ID',
        };
      }
      if (!(await this.isValidCompany(companyId))) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect Company ID',
        };
      }

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
    if (!(await this.isValidCompany(companyId))) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'incorrect Company ID',
      };
    }
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
  }
  async findAllByUser({
    userId,
  }: Project.FindAllProjectByUserRequestDto): Promise<Project.ProjectResponse> {
    if (!(await this.isValidClient(userId))) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'incorrect User ID',
      };
    }
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
  }

  async findAllByClient({
    clientId,
  }: Project.FindAllProjectByClientRequestDto): Promise<Project.ProjectResponse> {
    if (!(await this.isValidClient(clientId))) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'incorrect Client ID',
      };
    }
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
  }

  async update(
    updateProjectRequestDto: Project.UpdateProjectRequestDto,
  ): Promise<Project.ProjectResponse> {
    const { id, clientId, companyId, userId } = updateProjectRequestDto;
    const project = await this.projectRepo.findOneById({ id });
    if (project) {
      if (clientId) {
        if (!(await this.isValidClient(clientId))) {
          return {
            status: HttpStatus.BAD_REQUEST,
            error: 'incorrect Client ID',
          };
        }
      }
      if (userId) {
        if (!(await this.isValidUser(userId))) {
          return {
            status: HttpStatus.BAD_REQUEST,
            error: 'incorrect User ID',
          };
        }
      }
      if (companyId) {
        if (await this.isValidCompany(companyId)) {
          return {
            status: HttpStatus.BAD_REQUEST,
            error: 'incorrect Company ID',
          };
        }
      }
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

  private async isValidUser(id: string): Promise<boolean> {
    const userResponse = await firstValueFrom(
      await this.userService.send<
        User.UserResponseDto,
        User.FindOneUserByIdRequestDto
      >(User.Message.findOneById, { id }),
    );

    if (userResponse.status === HttpStatus.OK) {
      return true;
    }
    return false;
  }

  private async isValidClient(id: string): Promise<boolean> {
    const ClientResponse = await firstValueFrom(
      await this.clientService.send<
        Client.ClientResponseDto,
        Client.FindOneClientByIdRequestDto
      >(Client.Message.findOneById, { id }),
    );
    if (ClientResponse.status === HttpStatus.OK) {
      return true;
    }
    return false;
  }

  private async isValidCompany(id: string): Promise<boolean> {
    const companyResponse = await firstValueFrom(
      await this.companyService.send<
        Company.companyResponseDto,
        Company.FindOneCompanyByIdRequestDto
      >(Company.Message.findOneById, { id }),
    );
    if (companyResponse.status === HttpStatus.OK) {
      return true;
    }
    return false;
  }
}
