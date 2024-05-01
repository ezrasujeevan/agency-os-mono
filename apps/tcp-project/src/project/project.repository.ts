import { Injectable, Logger } from '@nestjs/common';
import { ProjectEntity } from './project.entity';
import { Project } from '@agency-os/class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectRepository {
  private logger: Logger = new Logger(ProjectRepository.name);
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepo: Repository<ProjectEntity>,
  1) {}

  async create(
    createProjectRequestDto: Project.CreateProjectRequestDto,
  ): Promise<ProjectEntity | Error> {
    try {
      const project = this.projectRepo.create(createProjectRequestDto);
      this.logger.verbose('Project created', project);
      return await this.projectRepo.save(project);
    } catch (error: Error | any) {
      this.logger.error(error.name, error.message);
      return error;
    }
  }

  async findOneById({
    id,
  }: Project.FindOneProjectRequestByIdDto): Promise<ProjectEntity | null> {
    const project = await this.projectRepo.findOne({ where: { id } });
    this.logger.verbose('Project found by ID', project);
    return project;
  }

  async findOneByTrialName({
    trialName,
  }: Project.FindOneProjectRequestByTrialNameDto): Promise<ProjectEntity | null> {
    const project = await this.projectRepo.findOne({ where: { trialName } });
    this.logger.verbose('Project found by Trial Name', project);
    return project;
  }

  async findAll(): Promise<ProjectEntity[] | null> {
    const projects = await this.projectRepo.find({});
    this.logger.verbose('All projects found', projects);
    return projects;
  }

  async findAllByCompany({
    companyId,
  }: Project.FindAllProjectByCompanyRequestDto): Promise<
    ProjectEntity[] | null
  > {
    const projects = await this.projectRepo.find({ where: { companyId } });
    this.logger.verbose('All projects found by Company', projects);
    return projects;
  }
  async findAllByUser({
    userId,
  }: Project.FindAllProjectByUserRequestDto): Promise<ProjectEntity[] | null> {
    const projects = await this.projectRepo.find({ where: { userId } });
    this.logger.verbose('All projects found by User', projects);
    return projects;
  }

  async findAllByClient({
    clientId,
  }: Project.FindAllProjectByClientRequestDto): Promise<
    ProjectEntity[] | null
  > {
    const projects = await this.projectRepo.find({ where: { clientId } });
    this.logger.verbose('All projects found by Client', projects);
    return projects;
  }

  async update(
    id: string,
    UpdateProjectRequestDto: Project.UpdateProjectRequestDto,
  ): Promise<ProjectEntity | Error> {
    try {
      const project = await this.projectRepo.findOne({ where: { id } });
      if (project) {
        this.logger.verbose('Project Found', project);
        const projectUpdate = await this.projectRepo.merge(
          project,
          UpdateProjectRequestDto,
        );
        this.logger.verbose('Project Updated', projectUpdate);
        return await this.projectRepo.save(projectUpdate);
      } else {
        this.logger.error('incorrect Project ID');
        throw new Error('incorrect Project ID');
      }
    } catch (error: Error | any) {
      this.logger.error(error.name, error.message);
      this.logger.error('incorrect Project ID');
      return error;
    }
  }

  async remove({
    id,
  }: Project.FindOneProjectRequestByIdDto): Promise<ProjectEntity> {
    const projectRemoved = await this.projectRepo.softRemove({ id });
    this.logger.verbose('Project Removed', projectRemoved);
    return projectRemoved;
  }
}
