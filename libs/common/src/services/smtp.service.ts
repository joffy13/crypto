import path = require('node:path');
import fs = require('node:fs');
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailPurposeEnum } from '../enums/mail-purpose.enum';

@Injectable()
export class SmtpService implements OnModuleInit {
  mailer: nodemailer.Transporter;

  constructor(private configService: ConfigService) {}
  onModuleInit() {
    this.mailer = nodemailer.createTransport(
      <SMTPTransport.Options>{
        pool: true,
        host: this.configService.get<string>('MAILER_HOST', 'smtp.mail.ru'),
        port: this.configService.get<number>('MAILER_PORT', 587),
        secure: false,
        auth: {
          user: this.configService.get<string>('MAILER_LOGIN', 'some@mail.ru'),
          pass: this.configService.get<string>('MAILER_PASSWORD', 'password'),
        },
        tls: {
          rejectUnauthorized: false,
        },
        from: {
          name: this.configService.get<string>(
            'MAILER_SENDER_NAME',
            'somename',
          ),
          address: this.configService.get<string>(
            'MAILER_SENDER_EMAIL',
            'somename@mail.ru',
          ),
        },
      },
      <SMTPTransport.Options>{
        from: {
          name: this.configService.get<string>(
            'MAILER_SENDER_NAME',
            'somename',
          ),
          address: this.configService.get<string>(
            'MAILER_SENDER_EMAIL',
            'somename@mail.ru',
          ),
        },
      },
    );
  }

  async sendMail(options: any, purpose: MailPurposeEnum, variables: any) {
    const mail = await new Promise((resolve, reject) =>
      this.mailer.sendMail(
        {
          to: options.to,
          subject: 'send email',
          html: this.getMailTemplate(purpose, variables),
        },
        (error: any, info: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(info.response.split(' ')[2]);
          }
        },
      ),
    );
    return {
      mail,
    };
  }

  getMailTemplate(purpose: MailPurposeEnum, variables: any): string {
    const template = handlebars.compile(
      fs.readFileSync(
        path.join(`dist/mailer/templates/${purpose}.hbs`),
        'utf8',
      ),
    );
    return template(variables);
  }
}
