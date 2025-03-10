import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../user/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@ApiBearerAuth()
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(userId: number) {
    return this.projectRepository.find({ where: { user: { id: userId } }, loadRelationIds: true });
  }

  async findOne(userId: number, id: number) {
    const project = await this.projectRepository.findOne({
      where: { id: +id, user: { id: userId } },
      loadRelationIds: true,
    });
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  async create(userId: number, createProjectDto: CreateProjectDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    const project = this.projectRepository.create({
      ...createProjectDto,
      user,
    });
    return this.projectRepository.save(project);
  }

  async update(userId: number, id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(userId, id);

    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return this.projectRepository.save({ project, ...updateProjectDto });
  }

  async remove(userId: number, id: number) {
    const project = await this.findOne(userId, id);
    return this.projectRepository.remove(project);
  }
}
