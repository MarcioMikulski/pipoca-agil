import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.hostinger.com',
          port: 465,
          secure: true,
          secureConnection: false,
          tls: {
            ciphers: 'SSLv3',
          },
          requireTLS: true,
          auth: {
            user: process.env.EMAIL_LOGIN,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
        preview: false,
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
