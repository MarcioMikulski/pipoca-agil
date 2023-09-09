import {
  ConflictException,
  Body,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  async getUsers(): Promise<ResponseUserDto[]> {
    return this.UsersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<ResponseUserDto> {
    return this.UsersService.findOne(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const { email } = user;
    const emailTaken = await this.UsersService.isEmailTaken(email);

    if (emailTaken) {
      throw new ConflictException('Email already registered');
    }

    await this.UsersService.create(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.UsersService.delete(id);
  }

  @Post('/change-password/:id')
  @UseGuards(AuthGuard)
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: number,
  ) {
    await this.UsersService.updatePassword(id, updatePasswordDto);
  }
}
