import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findOne(userId: number) {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!profile) {
      throw new NotFoundException(`Profile not found`);
    }

    const projects = await this.projectRepository.find({
      where: { user: { id: userId } },
      loadRelationIds: true,
    });

    return { profile, projects };
  }
}
