import { Resolver, Query } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.type';
import { GetCurrenciesResult } from './dto/results/get-currencies.result';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(
    private readonly currenciesService: CurrenciesService,
    private currencyService: CurrenciesService,
  ) {}

  // @Mutation(() => Currency)
  // createCurrency(
  //   @Args('createCurrencyInput') createCurrencyInput: CreateCurrencyInput,
  // ) {
  //   return this.currenciesService.create(createCurrencyInput);
  // }

  @Query(() => GetCurrenciesResult, { name: 'getCurrencies' })
  async getCurrencies(): Promise<GetCurrenciesResult> {
    return this.currenciesService.getCurrencies();
  }

  // @Query(() => Currency, { name: 'currency' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.currenciesService.findOne(id);
  // }

  // @Mutation(() => Currency)
  // updateCurrency(
  //   @Args('updateCurrencyInput') updateCurrencyInput: UpdateCurrencyInput,
  // ) {
  //   return this.currenciesService.update(
  //     updateCurrencyInput.id,
  //     updateCurrencyInput,
  //   );
  // }

  // @Mutation(() => Currency)
  // removeCurrency(@Args('id', { type: () => Int }) id: number) {
  //   return this.currenciesService.remove(id);
  // }
}
