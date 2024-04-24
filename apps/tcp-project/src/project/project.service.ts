import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { Repository } from 'typeorm';
import { Project } from '@agency-os/class';
import { error } from 'console';
import { stat } from 'fs';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepo: Repository<ProjectEntity>,
  ) {}

  async create(
    createProjectRequestDto: Project.CreateProjectRequestDto,
  ): Promise<Project.ProjectResponse> {
    try {
      const project = this.projectRepo.create(createProjectRequestDto);
      await this.projectRepo.save(project);
      return {
        project,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOneById({
    id,
  }: Project.FindOneProjectRequestByIdDto): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (project) {
      return { project, status: HttpStatus.OK };
    }
    return {
      error: 'Project not found',
      status: HttpStatus.BAD_REQUEST,
    };
  }

  async findOneByTrialName({
    trialName,
  }: Project.FindOneProjectRequestByTrialNameDto): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.findOne({ where: { trialName } });
    if (project) {
      return { project, status: HttpStatus.OK };
    }
    return {
      error: 'Project not found',
      status: HttpStatus.BAD_REQUEST,
    };
  }

  async findAll(): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.find({});
    return {
      project,
      status: HttpStatus.OK,
    };
  }

  async findAllByCompany({
    companyId,
  }: Project.FindAllProjectByCompanyRequestDto): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.find({ where: { companyId } });
    return {
      project,
      status: HttpStatus.OK,
    };
  }
  async findAllByUser({
    userId,
  }: Project.FindAllProjectByUserRequestDto): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.find({ where: { userId } });
    return {
      project,
      status: HttpStatus.OK,
    };
  }

  async findAllByClient({
    clientId,
  }: Project.FindAllProjectByClientRequestDto): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.find({ where: { clientId } });
    return {
      project,
      status: HttpStatus.OK,
    };
  }

  async update(
    id: string,
    UpdateProjectRequestDto: Project.UpdateProjectRequestDto,
  ): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (project) {
      const updatedProject = await this.projectRepo.update(
        id,
        UpdateProjectRequestDto,
      );
      return {
        project: updatedProject,
        status: HttpStatus.OK,
      };
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: 'incorrect Project ID',
    };
  }

  async remove({
    id,
  }: Project.FindOneProjectRequestByIdDto): Promise<Project.ProjectResponse> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (project) {
      await this.projectRepo.delete(id);
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
