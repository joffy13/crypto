import { CoinsEnum } from '@app/common/enums/coins.enum';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class CaclulateCurrencyInput {
  @Field(() => CoinInAndOutType)
  in: CoinInAndOutType;
  @Field(() => CoinInAndOutType)
  out: CoinInAndOutType;
}

@ObjectType()
export class CoinInAndOutType {
  coin: CoinsEnum;
  amount: number; // Сумма обмена, по сути хуйня просто для сохранение в бд
  id: string; // Индефикатор монеты и фиксированного курса
}
