import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Encrypt } from 'src/auth/encrypt';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private encrypt = new Encrypt();
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  private convertToDTO(user: User): ResponseUserDto {
    return {
      id: user.id,
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
      datanascimento: user.datanascimento,
    };
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.convertToDTO(user));
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return this.convertToDTO(user);
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    return !!existingUser;
  }

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    user.senha = await this.encrypt.encrypt(user.senha);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOneByEmail(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: username });
  }

  async resetPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      const newPassword = Math.random().toString(36).slice(-8);
      user.senha = await this.encrypt.encrypt(newPassword);
      await this.userRepository.save(user);

      await this.emailService.sendMail({
        to: {
          email: user.email,
          name: user.nome,
        },
        from: {
          email: 'mikulski@solutionscloud.online',
          name: 'Equipe Pipoca Ágil',
        },
        subject: 'Recuperação de senha',
        template: './reset-password',
        context: {
          name: user.nome,
          newPassword: newPassword,
        },
      });
    } else {
      throw new Error('Usuário não encontrado com esse email');
    }
  }

  async updatePassword(id: number, body: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user) {
      const isPasswordCorrect = await this.encrypt.compare(
        body.senhaantiga,
        user.senha,
      );
      if (isPasswordCorrect) {
        user.senha = await this.encrypt.encrypt(body.novasenha);
        await this.userRepository.save(user);
      }
    }
  }

  
}
