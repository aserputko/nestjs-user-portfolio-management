import { IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  demoURL: string;

  @IsString()
  repositoryURL: string;
}
