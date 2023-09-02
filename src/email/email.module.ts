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
          host: 'sandbox.smtp.mailtrap.io',
          port: 2525,
          secure: false,
          auth: {
            user: '83ef480bfff8b8',
            pass: '8b8e17a7263ca6',
          },
        },
        defaults: {
          from: 'pipocaagil@gmail.com',
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
        preview: true,
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
