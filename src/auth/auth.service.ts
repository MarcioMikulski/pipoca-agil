import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Encrypt } from './encrypt';

@Injectable()
export class AuthService {
  private readonly encrypt = new Encrypt();
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && user.senha === password) {
      const { senha, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Usuário ou senha Invalidos');
  }
  async login(payload: User) {
    const user = await this.usersService.findOneByEmail(payload.email);
    const userMatch = await this.encrypt.compare(payload.senha, user.senha);
    if (userMatch) {
      return {
        nome: user.nome + ' ' + user.sobreNome,
        access_token: this.jwtService.sign({ email: payload.email }),
      };
    }
  }
}
