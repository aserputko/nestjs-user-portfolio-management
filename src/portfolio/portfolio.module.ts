import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Project } from '../project/entities/project.entity';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Project])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
