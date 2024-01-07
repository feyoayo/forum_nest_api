import { Injectable } from '@nestjs/common';
import { MailerService as NestMailer } from '@nestjs-modules/mailer';
import { User } from '../modules/user/entities/user.entity';
@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailer) {}

  async sendConfirmationEmail(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to the forum!',
      template: './confirmation',
      context: {
        username: user.nickname,
      },
    });
  }
}
