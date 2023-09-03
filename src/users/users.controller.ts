import {
  ConflictException,
  Body,
  Post,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  async getUsers(): Promise<CreateUserDto[]> {
    return this.UsersService.findAll();
  }

  @Post()
  async createUser(@Body() user: User) {
    const { email } = user;
    const emailTaken = await this.UsersService.isEmailTaken(email);

    if (emailTaken) {
      throw new ConflictException('Email already registered');
    }
    await this.UsersService.create(user);
    return 'Conta criada com sucesso';
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.UsersService.delete(id);
  }
}
