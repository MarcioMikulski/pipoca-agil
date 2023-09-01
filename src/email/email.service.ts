import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly mailerService: MailerService;

  async sendEmail(
    email: string,
    corpo: string,
    assunto: string,
    template: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: assunto,
      template: template,
      context: {
        corpo,
      },
    });
  }
}
