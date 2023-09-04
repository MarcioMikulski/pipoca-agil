import {
  ConflictException,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { compareSync, hashSync } from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService,
    private UpdatePasswordDto: UpdatePasswordDto,
    private CreateUserDto: CreateUserDto,
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
  /*   @Post('update-password')
    async updatePassword(@Body() user: User) {
      return await this.UsersService.updatePassword(User);
    } */

  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    const user: User = req.user;
    const isPasswordValid = compareSync(
      updatePasswordDto.senhaantiga,
      user.senha, // Suponhamos que a senha esteja armazenada de forma segura usando bcrypt
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha antiga incorreta.');
    }

    const newPasswordHash = hashSync(updatePasswordDto.novasenha, 10); // Gere um novo hash de senha

    await this.UsersService.updatePassword(user.senha, newPasswordHash);

    return { message: 'Senha atualizada com sucesso.' };
  }
}
