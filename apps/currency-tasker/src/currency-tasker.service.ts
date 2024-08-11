/* eslint-disable @typescript-eslint/no-unused-vars */
import { Currency } from '@app/api-core/currencies/entities/currency.type';
import { currencyConfig } from '@app/common/config/currency.config';
import { PrismaService } from '@app/common/services/prisma.service';
import { taskerIntervalUtil } from '@app/common/utils/tasker-interval.util';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import Redis from 'ioredis';

@Injectable()
export class CurrencyTaskerService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(CurrencyTaskerService.name);

  @Cron('*/5 * * * * *')
  async currencies() {
    console.log(taskerIntervalUtil());
    this.logger.log('hello');
    try {
      const symbol = currencyConfig.usedCurrencies.join(',');

      let symbolsToUse;
      if (currencyConfig.usedCurrencies.length !== currencyConfig.maxConverts) {
        const symbolsToKeep = currencyConfig.maxConverts;
        symbolsToUse = currencyConfig.usedCurrencies.slice(0, symbolsToKeep); // Создаем новый массив с нужным количеством элементов
      } else {
        symbolsToUse = currencyConfig.usedCurrencies;
      }
      const { data } = await this.httpService.axiosRef.get(
        'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',
        {
          headers: {
            'X-CMC_PRO_API_KEY': this.configService.get('COINMARKETCAP_KEY'),
          },
          params: {
            symbol,
            convert: symbolsToUse.join(','),
          },
        },
      );
      const currenciesToSave = [];
      let i = 0;
      for (const key in data.data) {
        if (data.data.hasOwnProperty(key) && data.data[key].length !== 0) {
          const currencyResult: any = { quotes: {} };
          const element = data.data[key][0];

          const getConstant = await this.prisma.currencyConstant.findMany({
            where: { name: element.name },
            orderBy: { created_at: 'desc' },
          });
          currencyResult.name = element.name;
          // currencyResult.symbol = element.symbol;
          // currencyResult.slug = element.slug;
          // currencyResult.coin_cdn_url =
          //   'https://previews.123rf.com/images/rusnickel/rusnickel1807/rusnickel180700007/105023802-bitcoin-coin-on-white-background-vector-illustration.jpg';
          currencyResult.currentAmount = 200;
          // currencyResult.exchange_max = 20;
          // currencyResult.exchange_min = 10;
          currencyResult.isAvailable =
            currencyResult.currentAmount < getConstant[0].exchange_min
              ? false
              : true;
          console.log(currencyResult.isAvailable);
          // currencyResult.type = element.is_fiat === 1 ? 'FIAT' : 'CRYPTO';
          for (const key in element.quote) {
            currencyResult.quotes[key] = element.quote[key].price;
          }
          currenciesToSave[i] = currencyResult;
          i++;
        }
      }
      const prismaResult = await this.saveHistory(currenciesToSave);
      console.log(prismaResult);

      await this.redis.set(
        'Currencies',
        JSON.stringify({ currencies: prismaResult }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async saveHistory(currencies: any[]) {
    // for (const currencyData of currencies) {
    //   await this.prisma.currencyConstant.create({
    //     data: {
    //       name: currencyData.name,
    //       symbol: currencyData.symbol,
    //       exchange_min: currencyData.exchange_min,
    //       exchange_max: currencyData.exchange_max,
    //       coin_cdn_url: currencyData.coin_cdn_url,
    //       type: currencyData.type,
    //     },
    //   });
    // }

    try {
      const createResult = [];
      await this.prisma.$transaction(async (tx) => {
        for (const currencyData of currencies) {
          const getConstant = await tx.currencyConstant.findMany({
            where: { name: currencyData.name },
            orderBy: { created_at: 'desc' },
          });
          const customDateTime = new Date();

          const saveResult: any = await tx.currency.create({
            data: {
              created_at: customDateTime,
              constant_id: getConstant[0].id,
              is_available: currencyData.isAvailable,
              current_amount: currencyData.currentAmount,
              quotes: currencyData.quotes,
            },
            include: { constant: true },
          });

          createResult.push(saveResult);
        }
      });
      console.log(createResult);
      this.logger.log('Currencies saved successfully');
      return createResult;
    } catch (error) {
      this.logger.error('Error saving currencies:', error);
    }
  }
}
