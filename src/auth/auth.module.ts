import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { AuthLocalStrategy } from './strategies/auth-local.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, Profile]),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthLocalStrategy, AuthJwtStrategy],
})
export class AuthModule {}
