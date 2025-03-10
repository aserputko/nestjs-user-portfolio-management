import { IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNumber()
  userId: number;

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
