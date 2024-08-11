import { NestFactory } from '@nestjs/core';
import { CurrencyTaskerModule } from './currency-tasker.module';
import { PrismaService } from '@app/common/services/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(CurrencyTaskerModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
