import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.profileRepository.find({ loadRelationIds: true });
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id: +id },
      // loadRelationIds: true,
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException(`Profile #${id} not found`);
    }
    return profile;
  }

  async create(createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: +createProfileDto.userId },
    });
    if (!user) {
      throw new NotFoundException(`User #${createProfileDto.userId} not found`);
    }

    const profile = this.profileRepository.create({
      ...createProfileDto,
      // email: user.email,
      user,
    });
    return this.profileRepository.save(profile);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.preload({
      id: +id,
      ...updateProfileDto,
    });

    if (!profile) {
      throw new NotFoundException(`Profile #${id} not found`);
    }
    return this.profileRepository.save(profile);
  }

  async remove(id: number) {
    const profile = await this.findOne(id);
    return this.profileRepository.remove(profile);
  }
}
