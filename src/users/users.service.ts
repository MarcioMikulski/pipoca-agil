import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Encrypt } from 'src/auth/encrypt';

@Injectable()
export class UsersService {
  private encrypt = new Encrypt();
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private userToCreateUserDto(user: User): CreateUserDto {
    const { nome, sobreNome, email } = user;
    return { nome, sobreNome, email }; // Retorna apenas as propriedades necessárias
  }

  async findAll(): Promise<CreateUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.userToCreateUserDto(user));
  }

  /* async findAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  } */

  async isEmailTaken(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    return !!existingUser;
  }
  async create(user: User): Promise<User> {
    user.senha = await this.encrypt.encrypt(user.senha);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOneByEmail(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: username });
  }
}
