import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @ApiProperty({ example: 'Andrii Serputko' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'aserputko@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '1234567890' })
  password: string;
}
