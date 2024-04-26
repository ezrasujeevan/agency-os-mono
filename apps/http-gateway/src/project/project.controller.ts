import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '@agency-os/class';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectRequestDto: Project.CreateProjectRequestDto) {
    return this.projectService.createProject(createProjectRequestDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectRequestDto: Project.UpdateProjectRequestDto,
  ) {
    return this.projectService.updateProject(id, updateProjectRequestDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectService.removeProject({ id });
  }

  @ApiQuery({
    name: 'id',
    type: String,
    description: 'Find by id',
    required: false,
  })
  @ApiQuery({
    name: 'trialName',
    type: String,
    description: 'Find by trialName',
    required: false,
  })
  @Get('find')
  findOneBy(@Query('id') id?: string, @Query('trialName') trialName?: string) {
    if (id) {
      return this.projectService.findOneProjectById({ id });
    } else if (trialName) {
      return this.projectService.findOneProjectByTrialName({ trialName });
    }
    throw new BadRequestException('need at least one query of id or trialName');
  }

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOneProjectById({ id });
  }

  @ApiQuery({
    name: 'user',
    type: String,
    description: 'Find User By Id',
    required: false,
  })
  @ApiQuery({
    name: 'client',
    type: String,
    description: 'Find client By Id',
    required: false,
  })
  @ApiQuery({
    name: 'company',
    type: String,
    description: 'Find company By Id',
    required: false,
  })
  @Get()
  findAll(
    @Query('user') userId?: string,
    @Query('client') clientId?: string,
    @Query('company') companyId?: string,
  ) {
    if (userId) {
      return this.projectService.findAllProjectByUser({ userId });
    } else if (clientId) {
      return this.projectService.findAllProjectByClient({ clientId });
    } else if (companyId) {
      return this.projectService.findAllProjectByCompany({ companyId });
    }
    return this.projectService.findAllProject();
  }
}
