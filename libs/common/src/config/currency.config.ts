import { CoinsEnum } from '../enums/coins.enum';

export const currencyConfig = {
  usedCurrencies: [CoinsEnum.BTC, CoinsEnum.EUR, CoinsEnum.RUB, CoinsEnum.USDT],
  coinCapLimit: 10000,
  maxConverts: 1,
};
