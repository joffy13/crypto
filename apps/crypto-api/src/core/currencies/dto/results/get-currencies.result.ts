import { Field, ObjectType } from '@nestjs/graphql';
import { Currency } from '../../entities/currency.type';

@ObjectType()
export class GetCurrenciesResult {
  @Field(() => [Currency], {
    description: 'Currencies list with quotes',
    nullable: true,
  })
  currencies?: Currency[];
}
