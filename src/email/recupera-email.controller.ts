import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { RequestResetPasswordDto } from 'src/auth/dto/request-reset-password';
import { RecuperaEmailService } from './recupera-email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { UsersService } from 'src/users/users.service';

@Controller('forgetpassword')
export class RecuperaEmailController {
  constructor(
    private readonly recuperaEmailService: RecuperaEmailService,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  @Post('request-reset-password')
  async requestResetPassword(@Body() requestDto: RequestResetPasswordDto) {
    // Verificar se o e-mail existe no sistema (essa lógica deve ser implementada)
    const userExists = this.usersService.isEmailTaken(requestDto.email); // Substitua por sua lógica de verificação de usuário

    if (!userExists) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const resetToken = this.recuperaEmailService.generateResetToken(
      requestDto.email,
    );
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await this.mailerService.sendMail({
      to: 'pipocaagilazul@outlook.com',
      subject: 'Redefinição de Senha',
      template: './reset-password',
      context: {
        resetLink,
      },
    });

    return { message: 'E-mail de recuperação de senha enviado com sucesso.' };
  }

  @Get('reset-password')
  async redirectToResetPassword(@Query('token') token: string, @Res() res) {
    // Verificar se o token é válido (essa lógica deve ser implementada)
    const tokenIsValid = true; // Substitua por sua lógica de validação de token

    if (!tokenIsValid) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }

    return res.redirect(`http://localhost:3000/reset-password?token=${token}`);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    // Verificar se o token é válido (essa lógica deve ser implementada)
    const tokenIsValid = true; // Substitua por sua lógica de validação de token

    if (!tokenIsValid) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }

    // Verificar se o token pertence a um usuário válido (use o AuthService para isso)

    // Atualizar a senha do usuário (essa lógica deve ser implementada)

    // Deletar o token de redefinição de senha (use o AuthService para isso)

    return { message: 'Senha redefinida com sucesso.' };
  }
}
