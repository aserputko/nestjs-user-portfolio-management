import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@ApiBearerAuth()
@ApiTags('Projects settings')
@Controller('users/:userId/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.projectService.findAll(+userId);
  }

  @Post()
  create(@Param('userId') userId: string, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(+userId, createProjectDto);
  }

  @Patch(':id')
  update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(+userId, +id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.projectService.remove(+userId, +id);
  }
}
