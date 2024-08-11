export enum CurrencyTypeEnum {
  'FIAT',
  'CRYPTO',
}

export interface ICurrency {
  uuid: string;
  type: CurrencyTypeEnum;
  exchange: {
    min: number;
    max: number;
  };
  isAvailable?: boolean; // Если баланс меньше чем доступно в поле exchange.min = false
  currentAmount?: number; // Пингуем сервис(микросервис) который ответ за эту монету и запрашиваем баланс
  coin_cdn_url?: string; // Изображение монеты или фиата, стандартный бакет ответ от нашей cdn
}
