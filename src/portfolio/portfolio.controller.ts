import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveUserId } from '../auth/strategies/auth-active-user-id.decorator';
import { PortfolioService } from './portfolio.service';

@ApiBearerAuth()
@ApiTags('My Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  findOne(@ActiveUserId() userId: number) {
    return this.portfolioService.findOne(userId);
  }
}
