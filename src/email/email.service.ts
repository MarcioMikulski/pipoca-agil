import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailProvider, IMessage } from './email.interface';

@Injectable()
export class EmailService implements IMailProvider {
  private readonly mailerService: MailerService;

  constructor(mailerService: MailerService) {
    this.mailerService = mailerService;
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.mailerService.sendMail({
      to: {
        address: message.to.email,
        name: message.to.name,
      },
      from: {
        address: message.from.email,
        name: message.from.name,
      },
      subject: message.subject,
      template: message.template,
      context: message.context,
      html: message.html,
    });
  }
}
