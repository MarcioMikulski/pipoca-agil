import { ConflictException, Body, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.UsersService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const emailTaken = await this.UsersService.isEmailTaken(email);

    if (emailTaken) {
      throw new ConflictException('Email already registered');
    }
    return await this.UsersService.create(createUserDto);
  }
}
