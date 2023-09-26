import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Encrypt } from './encrypt';
import { ResponseLoginDTO } from './dto/response-login.dto';
import { RequestLoginDTO } from './dto/request-login.dto';
import { Repository } from 'typeorm';
import { UserGoogle } from './entities/google.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly encrypt = new Encrypt();
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async createUsergoogle(req) {
    const user = await this.userRepository.findOneBy({ email: req.user.email });
    if (!user) {
      const user = new UserGoogle();
      user.email = req.user.email;
      user.nome = req.user.firstName;
      user.sobrenome = req.user.lastName;
      user.senha = '123456';
      await this.userRepository.save(user);
    }
  }

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
