import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = this.userRepository.create(signupDto);
    const userEntity = await this.userRepository.save(user);
    const profile = this.profileRepository.create({
      name: signupDto.name,
      image: '',
      jobTitle: '',
      bio: '',
      user: userEntity,
    });

    await this.profileRepository.save(profile);

    return await this.profileRepository.findOne({
      where: {
        user: { id: userEntity.id },
      },
      relations: ['user'],
    });
  }

  async login(loginDto: LoginDto) {
    return `This action login`;
  }
}
