import { Global, Module } from '@nestjs/common';

import { PrismaService } from './services/prisma.service';
import { SmtpService } from './services/smtp.service';
import { JwtService } from './services/jwt.service';

@Global()
@Module({
  providers: [PrismaService, SmtpService, JwtService],
  exports: [PrismaService, SmtpService, JwtService],
})
export class CommonModule {}
