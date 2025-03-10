import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  jobTitle: string;

  @IsString()
  @IsOptional()
  bio: string;
}
