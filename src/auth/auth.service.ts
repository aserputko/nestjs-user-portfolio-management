import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../user/entities/user.entity';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private jwtService: JwtService,
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

  async login(userId: string) {
    const payload = { sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: username },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
