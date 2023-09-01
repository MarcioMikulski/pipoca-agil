import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Encrypt } from 'src/auth/encrypt';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';


@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({}), Encrypt],
  controllers: [UsersController],
  providers: [UsersService, AuthService, EmailService],
  exports: [UsersService],
})
export class UsersModule { }
