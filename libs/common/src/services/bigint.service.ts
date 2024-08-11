import { Injectable } from '@nestjs/common';
import { bigint } from 'bigint';
import { PrismaService } from './prisma.service';
import { CaclulateCurrencyInput } from '@app/api-core/calculate/dto/calculate-currency.input';

@Injectable()
export class BigintService {
  constructor(private prisma: PrismaService) {}

  async caclulateCurrencyCost(dto: CaclulateCurrencyInput) {
    const inCoin = await this.prisma.currency.findUnique({
      where: { id: dto.in.id },
    });
    const outCoin = await this.prisma.currency.findUnique({
      where: { id: dto.out.id },
    });
    const { currency_percent } = await this.prisma.config.findMany({
      orderBy: { created_at: 'desc' },
    })[0];
    const inBigint = bigint(inCoin);
  }
}
