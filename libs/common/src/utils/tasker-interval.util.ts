import { currencyConfig } from '../config/currency.config';

export const taskerIntervalUtil = () => {
  const intervalBetweenRequests = (30 * 24 * 60) / currencyConfig.coinCapLimit; // Интервал между запросами в минутах
  if (intervalBetweenRequests < 1) {
    const seconds = Math.ceil(intervalBetweenRequests * 60);
    return `*/${seconds.toFixed().toString()}  * * * * *`;
  }
  const minutes = Math.ceil(intervalBetweenRequests);
  return `*/${minutes.toFixed().toString()} * * * * *`;
};
