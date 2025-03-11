import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveUserId } from '../auth/strategies/auth-active-user-id.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@ApiBearerAuth()
@ApiTags('Projects settings')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@ActiveUserId() userId: number) {
    return this.projectService.findAll(userId);
  }

  @Post()
  create(@ActiveUserId() userId: number, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(userId, createProjectDto);
  }

  @Patch(':id')
  update(
    @ActiveUserId() userId: number,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(userId, +id, updateProjectDto);
  }

  @Delete(':id')
  remove(@ActiveUserId() userId: number, @Param('id') id: string) {
    return this.projectService.remove(userId, +id);
  }
}
