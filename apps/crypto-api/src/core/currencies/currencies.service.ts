import { Injectable } from '@nestjs/common';
import { CreateCurrencyInput } from './dto/inputs/create-currency.input';
import { UpdateCurrencyInput } from './dto/inputs/update-currency.input';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { GetCurrenciesResult } from './dto/results/get-currencies.result';

@Injectable()
export class CurrenciesService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  create(createCurrencyInput: CreateCurrencyInput) {
    console.log(createCurrencyInput);
    return 'This action adds a new currency';
  }

  async getCurrencies(): Promise<GetCurrenciesResult> {
    const currencies = JSON.parse(await this.redis.get('Currencies'));
    const res = currencies.currencies.map((x) => {
      x.created_at = new Date(x.created_at);
      x.constant.created_at = new Date(x.constant.created_at);
      return x;
    });
    console.log(res);
    return { currencies: res };
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  update(id: number, updateCurrencyInput: UpdateCurrencyInput) {
    console.log(updateCurrencyInput);
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
