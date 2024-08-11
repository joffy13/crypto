import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { CurrencyConstant } from './currency-constant.type';

@ObjectType()
export class Currency {
  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  quotes: Record<string, number>;

  @Field(() => CurrencyConstant, {
    nullable: true,
  })
  constant: CurrencyConstant;

  @Field(() => Boolean, {
    nullable: true,
  })
  isAvailable?: boolean;

  @Field(() => String, {
    nullable: true,
  })
  currentAmount?: number;

  @Field(() => Date, {
    nullable: true,
  })
  created_at?: Date;
}
