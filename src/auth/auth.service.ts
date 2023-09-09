import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Encrypt } from './encrypt';
import { ResponseLoginDTO } from './dto/response-login.dto';
import { RequestLoginDTO } from './dto/request-login.dto';

@Injectable()
export class AuthService {
  private readonly encrypt = new Encrypt();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: RequestLoginDTO): Promise<ResponseLoginDTO> {
    const userFound = await this.usersService.findOneByEmail(user.email);
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await this.encrypt.compare(
      user.senha,
      userFound.senha,
    );
    if (!passwordMatch) {
      throw new NotFoundException('Wrong password');
    }
    const payload = { email: userFound.email, sub: userFound.id };
    return {
      id: userFound.id,
      nome: userFound.nome,
      access_token: this.jwtService.sign(payload),
    };
  }
}
