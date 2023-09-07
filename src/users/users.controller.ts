import {
  ConflictException,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { compareSync, hashSync } from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService,

  ) { }

  @Get()
  async getUsers(): Promise<CreateUserDto[]> {
    return this.UsersService.findAll();
  }


  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.UsersService.findOne(id);
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
  /*   @Post('/change-password')
    async updatePassword(@Body() user: UpdatePasswordDto, ) {
    
     
    }*/

  @Post('/change-password/:id')
  @UseGuards(AuthGuard)
  async changePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Param('id') id: number) {
  await this.UsersService.updatePassword(id, updatePasswordDto.senhaantiga, updatePasswordDto.novasenha);
    return 'Senha alterada com sucesso';
}

}