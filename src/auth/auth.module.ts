import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { Encrypt } from './encrypt';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UserGoogle } from './entities/google.entity';
import { EmailService } from 'src/email/email.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meuovo',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      },
    }),
    Encrypt,

  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, EmailService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
