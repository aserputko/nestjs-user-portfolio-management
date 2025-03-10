import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.projectRepository.find({ loadRelationIds: true });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id: +id },
      loadRelationIds: true,
    });
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto) {
    const user = await this.userRepository.findOne({
      where: { id: +createProjectDto.userId },
    });
    if (!user) {
      throw new NotFoundException(`User #${createProjectDto.userId} not found`);
    }

    const project = this.projectRepository.create({
      ...createProjectDto,
      user,
    });
    return this.projectRepository.save(project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.preload({
      id: +id,
      ...updateProjectDto,
    });

    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return this.projectRepository.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    return this.projectRepository.remove(project);
  }
}
