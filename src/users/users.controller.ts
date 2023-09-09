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
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
    type: Error,
  })
  async getUsers(): Promise<ResponseUserDto[]> {
    return this.UsersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async getUser(@Param('id') id: number): Promise<ResponseUserDto> {
    return this.UsersService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Cadastro efetuado com sucesso.',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Email já cadastrado.',
    type: Error,
  })
  async createUser(@Body() user: CreateUserDto) {
    const { email } = user;
    const emailTaken = await this.UsersService.isEmailTaken(email);

    if (emailTaken) {
      throw new ConflictException('Email already registered');
    }

    await this.UsersService.create(user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async deleteUser(@Param('id') id: number) {
    return await this.UsersService.delete(id);
  }

  @Post('/change-password/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: number,
  ) {
    await this.UsersService.updatePassword(id, updatePasswordDto);
  }
}
