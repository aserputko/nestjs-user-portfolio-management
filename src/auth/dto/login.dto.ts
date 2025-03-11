import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'aserputko@gmail.com' })
  username: string;

  @IsString()
  @ApiProperty({ example: '1234567890' })
  password: string;
}
