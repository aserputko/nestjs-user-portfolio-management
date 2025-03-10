import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiBearerAuth()
@ApiTags('Profile settings')
@Controller('users/:userId/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  findOne(@Param('userId') userId: string) {
    return this.profileService.findOne(+userId);
  }

  @Patch('')
  update(@Param('') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+userId, updateProfileDto);
  }
}
